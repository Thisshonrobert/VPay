"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Appbar } from "ui/prebuilt/index";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div className="bg-pink-50">
      <Appbar onLogoClick={()=>router.push("/dashboard")} onSignin={()=>router.push("/auth/signin")} onSignout={async () => {
        await signOut({redirect:false})
        router.push("/signin")
       
      }} 
      user={session.data?.user} />
   </div>
  );
}
