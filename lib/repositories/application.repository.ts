import { pool } from "../db";

export async function getApplicationById(id: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}