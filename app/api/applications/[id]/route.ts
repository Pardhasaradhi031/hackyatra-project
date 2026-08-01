import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

import { getSLAInfo, formatDate } from "@/lib/sla";
import { buildTimeline } from "@/lib/timeline";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const { rows } = await pool.query(
      `
      SELECT
        id,
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

        created_at,
        updated_at,
        sla_due_date

      FROM applications
      WHERE id = $1
      `,
      [id],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        {
          status: 404,
        },
      );
    }

    const application = rows[0];

    // Citizens can only view their own applications
    if (user.role === "Citizen" && application.citizen_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
        },
      );
    }

    const createdAt = new Date(application.created_at);

    const updatedAt = new Date(application.updated_at);

    const slaDueDate = application.sla_due_date
      ? new Date(application.sla_due_date)
      : (() => {
          const fallback = new Date(createdAt);
          fallback.setDate(fallback.getDate() + 7);
          return fallback;
        })();

    const sla = getSLAInfo(createdAt, slaDueDate, 7);

    const timeline = buildTimeline(
      application.current_stage,
      createdAt,
      updatedAt,
    );

    return NextResponse.json({
      success: true,

      application: {
        id: application.id,

        ward_id: application.ward_id,
        application_number: application.application_number,

        application_type: application.application_type,

        child_name: application.child_name,

        father_name: application.father_name,

        mother_name: application.mother_name,

        hospital_name: application.hospital_name,

        date_of_birth: application.date_of_birth,

        deceased_name: application.deceased_name,

        date_of_death: application.date_of_death,

        place_of_death: application.place_of_death,

        cause_of_death: application.cause_of_death,

        address: application.address,

        status: application.status,

        current_stage: application.current_stage,

        submitted: formatDate(createdAt),

        created_at: application.created_at,

        updated_at: application.updated_at,

        sla_due_date: application.sla_due_date,

        sla,

        timeline,
      },
    });
  } catch (error) {
    console.error("GET /api/applications/[id] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch application",
      },
      {
        status: 500,
      },
    );
  }
}
