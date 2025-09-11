import { signIn, auth } from "@/auth";
import UserDropDown from "@/components/UserDropDoown";

function SignIn({ provider, ...props }: { provider?: string }) {
  return (
    <form
      className="h-full"
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button
        className="flex items-center justify-between shadow w-full h-full outline-0 text-black px-2 cursor-pointer hover:bg-[#03a4f4]"
        {...props}
      >
        Sign In
      </button>
    </form>
  );
}

export default async function Header() {
  const session = await auth();
  return (
    <header className="h-full">
      {session?.user ? (
        <UserDropDown user={session.user} />
      ) : (
        // 注意如果需要本地调试登录，需要代理开全局才可以通
        <SignIn />
      )}
    </header>
  );
}
