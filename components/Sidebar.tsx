import React, { Suspense } from "react";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarSearchField from "./SidebarSearchField";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
// import Link from "next/link";
import ShadcnButton from "@/components/ShadcnButton";
import AuthControl from "@/components/AuthControl";

export default async function Sidebar() {
  const locale = await getLocale();
  return (
    <div>
      <section className="col sidebar !h-[calc(100%-50px)]">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src={`/${locale}/logo.svg`}
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu h-[38px]" role="menubar">
          <SidebarSearchField />
          <ShadcnButton />
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
      <div className="w-[350px] min-w-[250px] h-[50px] bg-[#f5f7fa] text-right">
        <AuthControl />
      </div>
    </div>
  );
}
