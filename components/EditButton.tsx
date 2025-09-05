// components/EditButton.js
import Link from "next/link";

export default function EditButton({
  noteId,
  children,
  className = "",
}: {
  noteId: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  const isDraft = noteId == null;
  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
          className,
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
