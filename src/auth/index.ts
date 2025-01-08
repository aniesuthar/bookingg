import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"


import { PrismaAdapter } from "@auth/prisma-adapter";
const adapter = PrismaAdapter(prisma);


export const authOptions: NextAuthOptions = {
  adapter: adapter,
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // }
    }),
    // CredentialsProvider({
    //   name: 'Sign in',
    //   credentials: {
    //     email: {
    //       label: 'Email',
    //       type: 'email',
    //       placeholder: 'hello@example.com'
    //     },
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials.password) {
    //       return null
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email
    //       }
    //     })

    //     if (!user) {
    //       return null
    //     }

    //     const isPasswordValid = await compare(
    //       credentials.password,
    //       user.password || "n"
    //     )

    //     if (!isPasswordValid) {
    //       return null
    //     }

    //     return {
    //       id: user.id + '',
    //       email: user.email,
    //       name: user.name,
    //     }
    //   }
    // }),

  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST  }

// const { handlers: { GET, POST }, auth, signIn, signOut } = 
// const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions)
// export const { handlers as GET, handler as POST } = NextAuth(authOptions);
// export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions)