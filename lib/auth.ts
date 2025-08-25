import GitHub from 'next-auth/providers/github'
import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user) token.role = (user as { role: unknown }).role
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: unknown }).role = token.role
      }
      return session
    }
  }
}