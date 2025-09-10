import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

// 1. 国际化中间件
// 有了这个中间件，next-intl就会根据默认配置为项目匹配合适的国际化路径，
// 比如：http://localhost:3000/zh
// 如果不配置就是：http://localhost:3000
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    // 🚩 先跑 next-intl 逻辑
    const response = handleI18nRouting(request);
    // 🚩 再跑鉴权
    //   const token = await getToken({ req: request });

    //   // 例如：拦截 /admin 目录
    //   if (request.nextUrl.pathname.startsWith("/admin") && !token) {
    //     return NextResponse.redirect(new URL("/unauthorized", request.url));
    //   }

    return response;
}

// 2. 匹配规则：排除 api、静态资源
export const config = {
    matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};