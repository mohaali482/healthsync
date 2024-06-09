import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma';
import { getUserById } from '@/data/user';

async function getUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username
    }
  });
  if (!user || !user.isActive) return null;
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) return null;

  return {
    id: user.id,
    name: `${user.first_name} ${user.last_name}`
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.hospitalId = token.hospitalId;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.username = user.username;
      token.role = user.role;
      token.hospitalId = user.hospitalId;

      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string()
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }
        const { username, password } = parsedCredentials.data;
        const user = await getUser(username, password);
        return user;
      }
    })
  ]
});
