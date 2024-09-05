import { Button } from "./button";
import { Logo } from "./Logo";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: ()=>void,
    onSignout: ()=>void,
    onLogoClick:any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    onLogoClick
}: AppbarProps) => {
    return <div className="flex justify-between text-[#6a51a6] border-b border-slate-300 px-5 sm:px-12">
        <div className="flex items-center" onClick={onLogoClick}>
         <Logo />
            </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}