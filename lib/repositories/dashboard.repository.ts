import { pool } from "@/lib/db";

export async function getDashboardStats(citizenId: string) {
  const result = await pool.query(
    `
    SELECT
      COUNT(*) AS total,

      COUNT(*) FILTER (
        WHERE status IN (
          'Submitted',
          'Under Verification',
          'Verified'
        )
      ) AS pending,

      COUNT(*) FILTER (
        WHERE status = 'Approved'
      ) AS approved,

      COUNT(*) FILTER (
        WHERE status = 'Rejected'
      ) AS rejected

    FROM applications

    WHERE citizen_id = $1
    `,
    [citizenId]
  );

  const row = result.rows[0];

  return {
    total: Number(row.total),
    pending: Number(row.pending),
    approved: Number(row.approved),
    rejected: Number(row.rejected),
  };
}

export async function getRecentApplications(
  citizenId: string
) {
  const result = await pool.query(
    `
    SELECT
      id,
      application_number,
      application_type,
      status,
      current_stage,
      created_at

    FROM applications

    WHERE citizen_id = $1

    ORDER BY created_at DESC

    LIMIT 5
    `,
    [citizenId]
  );

  return result.rows;
}