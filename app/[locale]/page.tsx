import { getTranslations } from "next-intl/server";

// app/page.js
export default async function Page() {
  const t = await getTranslations("HomePage");
  return (
    <div className="note--empty-state">
      <span className="note-text--empty-state">{t("title")}</span>
    </div>
  );
}
