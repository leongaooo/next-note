import React, { Suspense } from "react";
import SidebarNoteList from "@/components/SidebarNoteList";
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "@/components/NoteListSkeleton";
import SidebarSearchField from "./SidebarSearchField";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
// import Link from "next/link";

export default async function Sidebar() {
  const locale = await getLocale();
  return (
    <div>
      <section className="col sidebar relative !h-[calc(100%-28px)]">
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
        <section className="sidebar-menu h-[50px]" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null} className="h-full !text-[12px]">
            Create
          </EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
      <div className="w-[30%] min-w-[250px] h-[28px] bg-[#f5f7fa] text-right">
        <Link href="/" locale="zh">
          中文
        </Link>
        <span className="mx-2">|</span>
        <Link href="/" locale="en">
          English
        </Link>
      </div>
    </div>
  );
}
