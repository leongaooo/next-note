import NoteEditor from "@/components/NoteEditor";

export default async function EditPage({ noteId }: { noteId: string }) {
  return <NoteEditor noteId={noteId} initialTitle="Untitled" initialBody="" />;
}
