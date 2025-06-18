// lib/auth.ts

import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // callbacks, pages, etc.
  callbacks: {
    async signIn({user}){
        const existingUser = await User.findOne({ email : user.email});
        if(!existingUser){
           const newUser = new User({
            name: user.name,
            email: user.email,
           });
            await newUser.save();
            console.log("new user created");
            return true
        }

        return true
    },
    async jwt({ token, account }) {
      
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
