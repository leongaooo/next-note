// auth.config.ts
import NextAuth, { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github" // example provider
import Credentials from "next-auth/providers/credentials"
import { signInSchema, ZodError } from "@/lib/zod"

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
                    const { email, password } = await signInSchema.parseAsync(credentials)
                    // logic to salt and hash password
                    // const pwHash = saltAndHashPassword(credentials.password)

                    // logic to verify if the user exists
                    // user = await getUserFromDb(credentials.email, pwHash)

                    // if (!user) {
                    //   // No user found, so this is their first attempt to login
                    //   // Optionally, this is also the place you could do a user registration
                    //   throw new Error("Invalid credentials.")
                    // }

                    // return user object with their profile data

                    console.log(email, password)
                    return {
                        email,
                        password,
                        userName: email.split("@")[0],
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
    secret: process.env.AUTH_SECRET, // ✅ must be set in .env
    trustHost: true, // 👈 加上这个
})

