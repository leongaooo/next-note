import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";
import { auth } from "./auth"; // 这里 auth 来自 next-auth v5 的配置文件

// 1. 国际化中间件
// 有了这个中间件，next-intl就会根据默认配置为项目匹配合适的国际化路径，
// 比如：http://localhost:3000/zh
// 如果不配置就是：http://localhost:3000
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    // 🚩 先跑 next-intl 逻辑
    const response = handleI18nRouting(request);
    // 🚩 再跑鉴权
    // ② 鉴权逻辑
    // auth() 在 v5 中可作为函数调用，接收 request 返回 session 信息
    const session = await auth();
    // 🚩 调试打印
    console.log("🚀 Session 信息:", JSON.stringify(session, null, 2));

    //   // 例如：拦截 /admin 目录
    // 例如：仅限制 /admin 路由
    //   if (request.nextUrl.pathname.startsWith("/admin")) {
    //     if (!session?.user) {
    //       return NextResponse.redirect(new URL("/unauthorized", request.url));
    //     }
    //   }

    return response;
}

// 2. 匹配规则：排除 api、静态资源
export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};