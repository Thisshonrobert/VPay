"use client"
import { SidebarItem } from "@components/SidebarItem";
import { FaAmazonPay } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setSidebarOpen(prev => !prev);
    window.addEventListener('toggleSidebar', handleToggle);
    return () => window.removeEventListener('toggleSidebar', handleToggle);
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-50 border-r border-slate-300 pt-8 md:pt-28 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:min-h-screen md:block shadow-lg md:shadow-none`}>
        <div>
          <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" onClick={() => setSidebarOpen(false)} />
          <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" onClick={() => setSidebarOpen(false)} />
          <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" onClick={() => setSidebarOpen(false)} />
          <SidebarItem href={"/p2p"} icon={<FaAmazonPay />} title="P2P Transfer" onClick={() => setSidebarOpen(false)} />
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 w-full mt-14 md:mt-0">
        {children}
      </div>
    </div>
  );
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

}