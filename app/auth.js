import { createUser, userExists } from "@/lib/actions/user.actions";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  // site : process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
    callbacks: {
      // async jwt({ token ,user}) {
      //   if (token) {
      //     token.username = token.email.split("@")[0]
      //     const fname = token.name.split(" ")[0]
      //     // format the name properly
      //     token.fname = fname[0].toUpperCase() + fname.slice(1).toLowerCase()
      //   }
      //   return token
      // },
      async session({ session}) {
        let id = await userExists(session.user.email);
        if (id==null) {
          id = await createUser(session.user)
        }
        session.id = id;
        return session
      },
    },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);