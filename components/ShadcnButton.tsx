"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarImport from "@/components/SidebarImport";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";

export default function ShadcnButton() {
  const router = useRouter();
  // 响应式关闭弹框优化
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = () => {
    router.push("/note/edit");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="ml-2 outline-0 bg-amber-500 text-white rounded-2xl px-2">
        Create
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>select create way</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* asChild 直接合并应用组件中的事件行为，使子组件中的行为生效 */}
        <DropdownMenuItem asChild>
          <SidebarImport setOpen={setIsOpen} />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleSelect}>write</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
