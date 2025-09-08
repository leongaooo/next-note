import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
// 有了这个中间件，next-intl就会根据默认配置为项目匹配合适的国际化路径，
// 比如：http://localhost:3000/zh
// 如果不配置就是：http://localhost:3000
export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};