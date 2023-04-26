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
        console.log(credentials);
        if (!credentials) return null;
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          const { uid } = userCredential.user;
          return { id: uid, email: credentials.email };
        } catch (e) {
          console.error(e);
          return null;
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
          return { id: uid, email: credentials.email };
        } catch (e) {
          console.error(e);
          return null;
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
