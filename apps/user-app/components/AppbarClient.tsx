"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "ui/prebuilt/index";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={()=>router.push("/auth/signin")} onSignout={async () => {
        await signOut()
        router.push("/auth/signin")
      }} 
      user={session.data?.user} />
   </div>
  );
}
