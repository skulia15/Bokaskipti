import NextAuth, { DefaultUser, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connect } from "../../../../utils/connection";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',

    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: '/auth/error',
  },
  theme: {
    colorScheme: "dark",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
        const { User } = await connect() // connect to database
        // let existingUser: typeof User | null = await User.findOne({ where: { googleId: user.id } });
        const existingUser = await User.findOne({ googleId: user.id });
        if (!existingUser) {
          user = await User.create({
            googleId: user.id,
            username: user.name,
            email: user.email,
            joined: Date.now()
          });
        }
      }
      return token
    },
    async session({ session, token, user }) {
      if (session.user) {
        (session.user as DefaultUser).id = token.id as string
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(authOptions)