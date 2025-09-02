"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // No need for the 'error' state variable anymore
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Redirect on successful login
      router.push("/dashboard");
    } else {
      const data = await response.json();
      const errorMessage = data.message || "Login failed. Please try again.";

      // Use SweetAlert to display the error
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#e53935", // A red color to match your design
      });
    }
  };

  return (
    <main className="h-[100dvh] bg-[linear-gradient(30deg,rgb(177,4,0),rgb(229,57,53))] flex justify-end">
      <div className="w-[min(100%,500px)] bg-white flex flex-col justify-center items-center">
        <Image
          src="/wmsu-logo.png"
          alt="WMSU Logo"
          width={150}
          height={150}
          className="mb-5"
          priority
        />

        <h5 className="mb-2.5 text-2xl">Online Adising System</h5>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-[300px]"
        >
          <div className="relative w-full inline-flex flex-col py-2.5">
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer border-b-2 border-b-black/54 mt-1 pt-2 pb-1 w-full outline-none focus:border-b-red-500 valid:border-b-red-500"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-0 text-black/54 text-lg origin-[0_0] transition-all
                  peer-placeholder-shown:translate-y-[24px] peer-placeholder-shown:scale-100
                  peer-focus:-translate-y-0 peer-focus:scale-80
                  peer-focus:text-red-500 
                  peer-valid:-translate-y-0 peer-valid:scale-80
                  peer-valid:text-red-500
                  pointer-events-none"
            >
              Username
            </label>
          </div>

          <div className="relative w-full inline-flex flex-col py-2.5">
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer border-b-2 border-b-black/54 mt-1 pt-2 pb-1 w-full outline-none focus:border-b-red-500 valid:border-b-red-500"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-0 text-black/54 text-lg origin-[0_0] transition-all
                  peer-placeholder-shown:translate-y-[24px] peer-placeholder-shown:scale-100
                  peer-focus:-translate-y-0 peer-focus:scale-80
                  peer-focus:text-red-500 
                  peer-valid:-translate-y-0 peer-valid:scale-80
                  peer-valid:text-red-500
                  pointer-events-none"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-6 m-2 px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </main>
  );
}
