import { pool } from "@/lib/db";

interface CreateApplicationParams {
  citizenId: string;
  applicationNumber: string;
  applicationType: "Birth" | "Death";

  childName?: string;
  fatherName?: string;
  motherName?: string;
  hospitalName?: string;
  dateOfBirth?: string;

  deceasedName?: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  causeOfDeath?: string;
  address?: string;
}

export async function createApplication(data: CreateApplicationParams) {
  const result = await pool.query(
    `
    INSERT INTO applications (
      citizen_id,
      application_number,
      application_type,

      child_name,
      father_name,
      mother_name,
      hospital_name,
      date_of_birth,

      deceased_name,
      date_of_death,
      place_of_death,
      cause_of_death,
      address,

      status,
      current_stage,
      sla_due_date
    )

    VALUES (
      $1,$2,$3,
      $4,$5,$6,$7,$8,
      $9,$10,$11,$12,$13,
      'Submitted',
      'Citizen',
      CURRENT_DATE + INTERVAL '7 days'
    )

    RETURNING *
    `,
    [
      data.citizenId,
      data.applicationNumber,
      data.applicationType,

      data.childName ?? null,
      data.fatherName ?? null,
      data.motherName ?? null,
      data.hospitalName ?? null,
      data.dateOfBirth ?? null,

      data.deceasedName ?? null,
      data.dateOfDeath ?? null,
      data.placeOfDeath ?? null,
      data.causeOfDeath ?? null,
      data.address ?? null,
    ],
  );

  return result.rows[0];
}

export async function getCitizenApplications(citizenId: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE citizen_id = $1
    ORDER BY created_at DESC
    `,
    [citizenId],
  );

  return result.rows;
}

export async function getApplicationById(id: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}
