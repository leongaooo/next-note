"use client";

import React from "react";
import { useRouter } from "@/i18n/navigation";
import { importNote } from "@/app/actions";

export default function SidebarImport({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
      setOpen(false);
    } catch (error) {
      console.error("something went wrong");
    }

    // 重置 file input
    e.target.type = "text";
    e.target.type = "file";
  };

  return (
    <div style={{ textAlign: "left" }} className="hover:bg-[#f5f5f5]">
      <label
        htmlFor="file"
        className="text-[14px] text-left ml-[8px]"
        style={{ cursor: "pointer" }}
      >
        upload .md File
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
