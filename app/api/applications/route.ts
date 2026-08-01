import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

import { NextRequest } from "next/server";
import { calculateSLADate } from "@/lib/sla";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (user.role !== "Citizen") {
      return NextResponse.json(
        {
          success: false,
          message: "Only citizens can submit applications.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const applicationNumber =
      "APP-" + Date.now().toString().slice(-8);

    const slaDueDate = calculateSLADate(7);

    await pool.query(
      `
      INSERT INTO applications (
        citizen_id,
        ward_id,
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
        $1,$2,$3,$4,
        $5,$6,$7,$8,$9,
        $10,$11,$12,$13,$14,
        'Submitted',
        'Citizen',
        $15
      )
      `,
      [
        user.id,
        user.ward_id,

        applicationNumber,
        body.applicationType,

        body.childName ?? null,
        body.fatherName ?? null,
        body.motherName ?? null,
        body.hospitalName ?? null,
        body.dateOfBirth ?? null,

        body.deceasedName ?? null,
        body.dateOfDeath ?? null,
        body.placeOfDeath ?? null,
        body.causeOfDeath ?? null,
        body.address ?? null,

        slaDueDate,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    let rows;

    if (user.role === "Citizen") {
      // Citizens see only their own applications
      ({ rows } = await pool.query(
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
        `,
        [user.id]
      ));
    } else if (user.role === "Officer") {
      // Officers see all applications in their ward
      ({ rows } = await pool.query(
        `
        SELECT
          id,
          application_number,
          application_type,
          status,
          current_stage,
          created_at
        FROM applications
        WHERE ward_id = $1
        ORDER BY created_at DESC
        `,
        [user.ward_id]
      ));
    } else {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      applications: rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}