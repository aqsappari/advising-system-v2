// src/components/sidebar/Sidebar.js
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center border-b">
        <Image src="/wmsu-logo.png" alt="WMSU Logo" width={40} height={40} />
        <h2 className="ml-4 text-xl font-bold">Advising</h2>
      </div>

      {/* Main Navigation */}
      <nav className="flex-grow">
        <ul className="flex flex-col py-4">
          <li>
            <SidebarItem href="/dashboard">Dashboard</SidebarItem>
          </li>
          <li>
            <SidebarItem href="/faculties">Faculties</SidebarItem>
          </li>
          <li>
            <SidebarItem href="/students">Students</SidebarItem>
          </li>
          <li>
            <SidebarItem href="/curriculums">Curriculums</SidebarItem>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t p-4">
        <SidebarItem href="/settings">Settings</SidebarItem>
        <div className="mt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
