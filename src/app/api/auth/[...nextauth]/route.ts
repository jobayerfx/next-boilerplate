import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db("next-app");
        try {
          const user = await db
            .collection("users")
            .findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  jwt: {
    secret: "asdcvbtjhm",
  },
  callbacks: {
    // async jwt(token: any, user: any) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    // async session(session: any, token: any) {
    //   session.user.id = token.id;
    //   return session;
    // },
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "github") {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db("next-app");
        try {
          const requestedUser = {
            email: user.email,
          };
          const existingUser = await db
            .collection("users")
            .findOne(requestedUser);
          if (!existingUser) {
            const newUser = await db
              .collection("users")
              .insertOne(requestedUser);

            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
