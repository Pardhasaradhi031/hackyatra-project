import { pool } from "@/lib/db";

export async function generateApplicationNumber() {
  const result = await pool.query(`
    SELECT COUNT(*) AS total
    FROM applications
  `);

  const next = Number(result.rows[0].total) + 1;

  return `APP-${String(next).padStart(6, "0")}`;
}