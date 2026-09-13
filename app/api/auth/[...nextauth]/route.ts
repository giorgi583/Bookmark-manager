import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) return null;
                await dbConnect();
                const user = await User.findOne({ email: credentials.email });
                if (!user) return null;
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordCorrect) return null;
                return {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.name
                }
            }
        })
    ],
    session: {
        strategy: "jwt" as const
    },
    callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.id = token.id
      session.user.username = token.username
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }