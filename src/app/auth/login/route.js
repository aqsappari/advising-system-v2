// src/app/auth/login/route.js
import pool from "@/lib/database";
import { testDbConnection } from "@/lib/database";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// Call the function immediately at the start of the file
testDbConnection();

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Find user in the database
    const [rows] = await pool.query(
      "SELECT employeeId, password FROM faculties WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Username not Found" },
        { status: 401 }
      );
    }

    const user = rows[0];
    const storedHash = user.password;

    // Compare the plain-text password with the stored hash
    const passwordMatch = await bcrypt.compare(password, storedHash);

    if (passwordMatch) {
      // If passwords match, create and set the session cookie
      const sessionId = uuidv4();

      // In a production environment, you should store the session ID in a database
      // and associate it with the user ID for proper session management.

      cookies().set("session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    } else {
      // If passwords don't match, return an error
      return NextResponse.json(
        { message: "Username and Password do not match" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
