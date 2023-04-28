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
  apiKey: "AIzaSyDTYLMLx4me6RruOfkxb1TMqtucN2EbNGU",
  authDomain: "graphiql-app.firebaseapp.com",
  projectId: "graphiql-app",
  storageBucket: "graphiql-app.appspot.com",
  messagingSenderId: "581579745098",
  appId: "1:581579745098:web:cc718240e2f1df78ec43b3",
  measurementId: "G-W6HLFS6K4J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginErrors = {
  "auth/invalid-email":
    "User with such email is not registred or you inputed the wrong password",

  "auth/user-not-found": "User with such email does not exist",

  "auth/email-already-in-use":
    "User with such email already exists, please Sign In or Sign Up with another email",

  "auth/wrong-password": "The password is not correct",

  "auth/too-many-requests": "Forgot password? We can restore it via your email",
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
            throw Error(generateClientError(e.message));
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
  pages: {
    error: "/auth/error",
  },
});
