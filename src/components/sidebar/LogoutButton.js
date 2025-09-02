// src/components/sidebar/LogoutButton.js
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to the login page after successful logout
        router.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left p-4 hover:bg-gray-100 transition-colors"
    >
      Logout
    </button>
  );
}
