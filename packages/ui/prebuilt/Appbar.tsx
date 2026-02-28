import { Button } from "./button";
import { Logo } from "./Logo";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: () => void,
    onSignout: () => void,
    onLogoClick: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    onLogoClick
}: AppbarProps) => {
    return (
        <div className="relative flex items-center justify-between text-[#6a51a6] border-b border-slate-300 px-4 sm:px-12 py-2 min-h-[60px] bg-slate-50 sticky top-0 z-50">
            <div className="flex items-center">
                {user && (
                    <button
                        className="md:hidden p-2 mr-2 text-[#6a51a6] focus:outline-none"
                        onClick={() => window.dispatchEvent(new Event('toggleSidebar'))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                )}
                <div className="hidden md:flex items-center cursor-pointer" onClick={onLogoClick}>
                    <Logo />
                </div>
            </div>

            <div className="flex md:hidden items-center absolute left-1/2 -translate-x-1/2 cursor-pointer" onClick={onLogoClick}>
                <Logo />
            </div>

            <div className="flex items-center">
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    );
}