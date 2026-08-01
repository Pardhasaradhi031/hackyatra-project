import { NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

export async function GET() {
  try {
    const officer = await getCurrentUser();

    if (!officer) {
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

    if (officer.role !== "Officer") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        {
          status: 403,
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
        created_at
      FROM applications
      WHERE ward_id = $1
      ORDER BY created_at DESC
      `,
      [officer.ward_id]
    );

    return NextResponse.json({
      success: true,
      applications: rows,
    });
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