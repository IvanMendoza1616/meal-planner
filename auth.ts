import client from "@/app/lib/db";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      profile(profile) {
        //Returns all values that are going to be stored in database
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          recipes: [],
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
});
