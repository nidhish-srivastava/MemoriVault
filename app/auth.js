import { createUser, userExists } from "@/lib/actions/user.actions";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    })
  ],
    callbacks: {
      async jwt({ token ,user}) {
        // save the username
        // console.log("user1",user);
        
        if (token) {
          token.username = token.email.split("@")[0]
          const fname = token.name.split(" ")[0]
          // format the name properly
          token.fname = fname[0].toUpperCase() + fname.slice(1).toLowerCase()
        }
        return token
      },
      async session({ session, token}) {
        session.username = token.username
        session.fname = token.fname
        session.bio = ''
        let id = await userExists(token.username);
        if (id==null) {
          id = await createUser({ username: session.username, name: session.fname, dp: token.picture })
        }
        session.id = id;
        return session
      }
    },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);