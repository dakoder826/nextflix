import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // Gets called whenever user tries to access route defined in middleware.js
    authorized({ auth, request }) {
      // If true is returned, then user is authorized to access route otherwise user is redirected to signin page
      return !!auth?.user;
    },

    // Callback gets called when user attempts to sign in, different from signIn function exported below (this acts like middleware)
    async signIn({ user, account, profile }) {
      // user object gets access to authenticated user object. name, email etc.
      // If the user doesn't exist in the databse, create a new user, if not don't do anything
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser)
          await createUser({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },

    // Adding the user's id to the session object for easy access throughout application
    async session({ session }) {
      const userData = await getUser(session.user.email);
      console.log(userData);
      session.user.userId = userData.id;
      return session;
    },
  },
  // Defines custom sign in page if user hits protected route and is not signed in.
  pages: {
    signIn: "/signin",
  },
};

export const {
  auth,
  // These are called when user actually clicks on the sign in or sign out buttons
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
