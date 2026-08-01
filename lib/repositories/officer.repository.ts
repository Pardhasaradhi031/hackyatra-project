import { pool } from "@/lib/db";

export async function getAllOfficers() {
  const { rows } = await pool.query(
    `
    SELECT
      users.id,
      users.name,
      users.email,
      users.role,
      users.ward_id,
      wards.ward_number,
      wards.ward_name
    FROM users
    LEFT JOIN wards
      ON wards.id = users.ward_id
    WHERE users.role = 'Officer'
    ORDER BY wards.ward_number, users.name;
    `
  );

  return rows;
}

export async function createOfficer(
  name: string,
  email: string,
  password: string,
  wardId: number
) {
  const { rows } = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password,
      role,
      ward_id
    )
    VALUES
    (
      $1,
      $2,
      $3,
      'Officer',
      $4
    )
    RETURNING
      id,
      name,
      email,
      role,
      ward_id;
    `,
    [name, email, password, wardId]
  );

  return rows[0];
}