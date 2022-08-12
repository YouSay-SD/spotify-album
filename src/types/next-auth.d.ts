import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
      expires_at: string
      accessToken: string
    } & DefaultSession['session']
  }
}
