import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import prisma from "./prisma"
import bcrypt from "bcrypt"

async function getUser(username: string) {
    return prisma.user.findFirst({
        where: {
            username,
        },
    })
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        username: z.string(),
                        password: z.string(),
                    })
                    .safeParse(credentials)

                if (!parsedCredentials.success) {
                    return null
                }
                const { username, password } = parsedCredentials.data
                const user = await getUser(username)
                if (!user) return null
                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password
                )

                if (!passwordsMatch) return null

                return user as any
            },
        }),
    ],
})
