// src/lib/database.js
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to test the database connection
export async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Successfully connected to the database!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
}

export default pool;
