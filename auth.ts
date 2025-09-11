// auth.config.ts
import NextAuth, { CredentialsSignin, User } from "next-auth"
import GitHub from "next-auth/providers/github" // example provider
import Credentials from "next-auth/providers/credentials"
import { signInSchema, ZodError } from "@/lib/zod"
import { getUser, addUser } from "@/lib/prisma"

class CustomError extends CredentialsSignin {
    code: string
    constructor(code: string) {
        super(code)
        this.code = code
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        // GitHub({
        //     clientId: process.env.AUTH_GITHUB_ID!,
        //     clientSecret: process.env.AUTH_GITHUB_SECRET!,
        // }),
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user: User | 0 | 1
                    const { email, password } = await signInSchema.parseAsync(credentials)
                    user = await getUser(email, password)
                    if (user === 0) {
                        user = await addUser(email, password)
                    } else if (user === 1) {
                        throw new CustomError("密码错误")
                    }

                    return {
                        userId: user.userId,
                        username: user.username,
                        email,
                        name: user.username?.split("@")[0],
                        image: "https://avatars.githubusercontent.com/u/61813243?v=4"
                    }
                } catch (error) {
                    if (error instanceof ZodError) {
                        console.log(error, typeof error)
                        const stringErr = error.issues?.map((item) => item.message).join(",")
                        console.log('%c [ error.message ]-56', 'font-size:13px; background:pink; color:#bf2c9f;', error.message)
                        throw new CustomError(stringErr)
                    }
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // ✅ use JWT-based sessions
    },
    // 显示回传id
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.userId = user.userId;
                token.username = user.username;
            }
            return token;
        },
        session: async ({ session, token }) => {
            // ✅ 这里才真正写进 Session
            session.user.userId = token.userId as string;
            session.user.username = token.username as string;
            return session;
        },
    },
    secret: process.env.AUTH_SECRET, // ✅ must be set in .env
    trustHost: true, // 👈 加上这个
})

