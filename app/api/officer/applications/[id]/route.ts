import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

import { buildTimeline } from "@/lib/timeline";
import { getSLAInfo, formatDate } from "@/lib/sla";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    if (user.role !== "Officer") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const { rows } = await pool.query(
      `
      SELECT *
      FROM applications
      WHERE id = $1
        AND ward_id = $2
      `,
      [id, user.ward_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    const app = rows[0];

    const sla = getSLAInfo(app.created_at, app.sla_due_date);

    const timeline = buildTimeline(
      app.current_stage,
      app.created_at,
      app.updated_at ?? app.created_at
    );

    return NextResponse.json({
      success: true,
      application: {
        ...app,

        submitted: formatDate(app.created_at),

        sla: {
          daysRemaining: sla.remainingDays,
          overdue: sla.isOverdue,
        },

        timeline,
      },
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    if (user.role !== "Officer") {
      return NextResponse.json(
        {
          success: false,
          message: "Only officers can perform this action.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const { status } = body;

    if (
      status !== "Approved" &&
      status !== "Rejected"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status.",
        },
        { status: 400 }
      );
    }

    // Check application belongs to officer's ward
    const { rows } = await pool.query(
      `
      SELECT
        id,
        ward_id
      FROM applications
      WHERE id = $1
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found.",
        },
        { status: 404 }
      );
    }

    if (rows[0].ward_id !== user.ward_id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot access this application.",
        },
        { status: 403 }
      );
    }

    const currentStage =
      status === "Approved"
        ? "Certificate Issued"
        : "Document Verification";

    await pool.query(
      `
      UPDATE applications
      SET
        status = $1,
        current_stage = $2,
        updated_at = NOW()
      WHERE id = $3
      `,
      [
        status,
        currentStage,
        id,
      ]
    );

    return NextResponse.json({
      success: true,
      message: `Application ${status.toLowerCase()} successfully.`,
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