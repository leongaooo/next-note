// auth.config.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github" // example provider

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt", // ✅ use JWT-based sessions
    },
    secret: process.env.AUTH_SECRET, // ✅ must be set in .env
    trustHost: true, // 👈 加上这个
})
// TODO 继续解决认证问题，排查是否是url不对