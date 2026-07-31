import { pool } from "@/lib/db";

export async function findUserByEmail(email: string) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  wardId: number,
) {
  const result = await pool.query(
    `
    INSERT INTO users(name,email,password, ward_id)
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `,
    [name, email, password, wardId],
  );

  return result.rows[0];
}

export async function findUserById(id: string) {
  const result = await pool.query(
    `
    SELECT
id,
name,
email,
role,
ward_id
FROM users
WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
}
