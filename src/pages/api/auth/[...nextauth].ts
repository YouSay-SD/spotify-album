import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'
import { SCOPE_SPOTIFY } from '../../../constants/index'

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: {
        params: { scope: SCOPE_SPOTIFY },
      },
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id
        token.expires_at = account.expires_at
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, user, token }) {
      session.user = token as any
      return session
    },
  },
})
