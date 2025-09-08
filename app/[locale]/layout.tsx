import "../globals.css";
import "@/public/style.css";
import Sidebar from "@/components/Sidebar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <div className="container">
          <div className="main">
            <NextIntlClientProvider>
              <Sidebar />
              <section className="col note-viewer">{children}</section>
            </NextIntlClientProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
