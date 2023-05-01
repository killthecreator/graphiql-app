import NextAuth from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import CredentialsProvider from "next-auth/providers/credentials";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const validate = () => {
  sendPasswordResetEmail(auth, "podiumfffuuu@gmail.com");
};

const loginErrors = {
  "auth/invalid-email":
    "User with such email is not registred or you inputed the wrong password",

  "auth/user-not-found": "User with such email does not exist",

  "auth/email-already-in-use": "User with such email already exists",

  "auth/wrong-password": "The password is not correct",

  "auth/too-many-requests": "Too many requests...",
};

const generateClientError = (errorCode: string): string => {
  const errorType = Object.keys(loginErrors).find(
    (error) => error === errorCode
  );
  return (
    loginErrors[errorType as keyof typeof loginErrors] ?? "Unknown server error"
  );
};

export default NextAuth({
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "sign-up",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const { uid } = userCredential.user;
          return uid ? { id: uid, email: credentials.email } : null;
        } catch (e) {
          if (e instanceof FirebaseError) {
            throw Error(generateClientError(e.code));
          } else {
            throw Error(generateClientError(e as string));
          }
        }
      },
    }),
    CredentialsProvider({
      id: "sign-in",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const { uid } = userCredential.user;
          return uid ? { id: uid, email: credentials.email } : null;
        } catch (e) {
          if (e instanceof FirebaseError) {
            throw Error(generateClientError(e.code));
          } else {
            throw Error(generateClientError(e as string));
          }
        }
      },
    }),
  ],
  adapter: FirestoreAdapter(app),
  session: {
    strategy: "jwt",
  },
});
