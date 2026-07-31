import { NextResponse } from "next/server";

import {pool} from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
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
        }
      );
    }

    const { rows } = await pool.query(
      `
      SELECT
        id,
        application_number,
        application_type,
        status,
        current_stage,
        created_at,
        updated_at,
        sla_due_date
      FROM applications
      WHERE citizen_id = $1
      ORDER BY created_at DESC
      `,
      [user.id]
    );

    return NextResponse.json(
      {
        success: true,
        applications: rows,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET /api/applications", error);

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