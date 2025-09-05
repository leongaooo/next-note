"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";

// 定义 Note 类型
type Note = {
  title: string;
  content: string;
};

// 定义 NoteItem 类型
type NoteItem = {
  noteId: string;
  note: Note;
  header: React.ReactNode;
};

// 定义组件 props 类型
export default function SidebarNoteList({ notes }: { notes: NoteItem[] }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");
  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <SidebarNoteItemContent
              key={noteId}
              id={noteId}
              title={note.title}
              expandedChildren={
                <p className="sidebar-note-excerpt">
                  {note.content.substring(0, 20) || <i>(No content)</i>}
                </p>
              }
            >
              {header}
            </SidebarNoteItemContent>
          );
        }

        return null;
      })}
    </ul>
  );
}
