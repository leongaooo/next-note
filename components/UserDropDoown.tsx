"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { User } from "next-auth";
import { signOutAction } from "@/app/actions";

function SignOut(props: { className?: string }) {
  return (
    <form className="w-full" action={signOutAction}>
      <button {...props}>Sign Out</button>
    </form>
  );
}

export default function UserDropDown({ user }: { user: User }) {
  const router = useRouter();
  // 响应式关闭弹框优化
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (locale: "en" | "zh") => {
    router.push("/", { locale });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center justify-between shadow w-full h-full outline-0 text-black px-2 cursor-pointer hover:bg-[#03a4f4]">
        <div className="flex items-center">
          {/* 移除直接渲染 user 对象，仅渲染用户名称 */}
          {/* 原代码直接渲染 user 对象会导致类型错误，因为 user 不是 ReactNode 类型 */}
          <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="ml-2">{user?.name}</span>
          <span className="ml-2 text-[12px] text-gray-500">{user?.email}</span>
        </div>
        <div>
          <span className="ml-2">...</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        {/* asChild 直接合并应用组件中的事件行为，使子组件中的行为生效 */}
        <DropdownMenuItem onSelect={() => handleSelect("zh")}>
          中文
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleSelect("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOut className="w-full h-[30px] !text-[14px]" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
