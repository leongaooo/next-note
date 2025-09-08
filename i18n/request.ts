import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : await getDefaultLocale();

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default
    };
});


export async function getDefaultLocale() {
    // 从浏览器中获取用户语言
    const Headers = await headers();
    const acceptLanguage = Headers.get('accept-language');
    const lang = acceptLanguage?.split(',')[0] || 'en';
    // 防止出现 en、en-us、en-GB 等场景
    return lang.split('-')[0];
}