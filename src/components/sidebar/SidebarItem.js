// src/components/sidebar/SidebarItem.js
import Link from "next/link";

export default function SidebarItem({ href, children, className }) {
  // Combine the default classes with any custom classes passed in
  const classes = `p-4 hover:bg-gray-100 transition-colors ${className || ""}`;

  return (
    <Link href={href} className="w-full">
      <div className={classes}>{children}</div>
    </Link>
  );
}
