import NextAuth from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { initializeApp } from "firebase/app";
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
  "invalid-email": {
    firebaseError: "Firebase: Error (auth/invalid-email).",
    clientError:
      "User with such email is not registred or you inputed the wrong password",
  },
  "user-not-found ": {
    firebaseError: "Firebase: Error (auth/user-not-found).",
    clientError:
      "User with such email is not registred or you inputed the wrong password",
  },
  "already-in-use ": {
    firebaseError: "Firebase: Error (auth/email-already-in-use).",
    clientError:
      "User with such email already exists, please Sign In or Sign Up with another email",
  },
  "wrong-password": {
    firebaseError: "Firebase: Error (auth/wrong-password).",
    clientError: "The password is not correct",
  },
};

const generateClientError = (errorMessage: string): string => {
  console.log(errorMessage);
  const errorType = Object.values(loginErrors).find(
    (error) => error.firebaseError === errorMessage
  );
  return errorType?.clientError ?? "Unknown server error";
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
          if (e instanceof Error) {
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
          if (e instanceof Error) {
            throw Error(generateClientError(e.message));
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
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
