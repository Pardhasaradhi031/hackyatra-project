import { pool } from "@/lib/db";

export async function createApplication(
  applicationNumber: string,
  citizenId: string,
  applicationType: "Birth" | "Death",
  applicantName: string,
  applicantEmail: string,
  applicantPhone: string,
  slaDueDate: Date
) {
  const result = await pool.query(
    `
    INSERT INTO applications
    (
        application_number,
        citizen_id,
        application_type,
        applicant_name,
        applicant_email,
        applicant_phone,
        sla_due_date
    )

    VALUES($1,$2,$3,$4,$5,$6,$7)

    RETURNING *
    `,
    [
      applicationNumber,
      citizenId,
      applicationType,
      applicantName,
      applicantEmail,
      applicantPhone,
      slaDueDate,
    ]
  );

  return result.rows[0];
}

export async function getCitizenApplications(
  citizenId: string
) {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE citizen_id = $1
    ORDER BY created_at DESC
    `,
    [citizenId]
  );

  return result.rows;
}

export async function getApplicationById(
  id: string
) {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}