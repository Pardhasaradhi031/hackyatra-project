import { pool } from "@/lib/db";

export async function generateApplicationNumber() {
  const result = await pool.query(
    `SELECT COUNT(*) FROM applications`
  );

  const count = Number(result.rows[0].count) + 1;

  return `APP-${count.toString().padStart(6, "0")}`;
}