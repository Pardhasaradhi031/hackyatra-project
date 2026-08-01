import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
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
        { status: 401 }
      );
    }

    if (user.role !== "Admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const [
      citizens,
      officers,
      applications,
      pending,
      approved,
      rejected,
    ] = await Promise.all([
      pool.query(
        `SELECT COUNT(*) FROM users WHERE role='Citizen'`
      ),

      pool.query(
        `SELECT COUNT(*) FROM users WHERE role='Officer'`
      ),

      pool.query(
        `SELECT COUNT(*) FROM applications`
      ),

      pool.query(
        `SELECT COUNT(*) FROM applications
         WHERE status='Submitted'`
      ),

      pool.query(
        `SELECT COUNT(*) FROM applications
         WHERE status='Approved'`
      ),

      pool.query(
        `SELECT COUNT(*) FROM applications
         WHERE status='Rejected'`
      ),
    ]);

    return NextResponse.json({
      success: true,

      stats: {
        citizens: Number(citizens.rows[0].count),
        officers: Number(officers.rows[0].count),
        applications: Number(applications.rows[0].count),

        pending: Number(pending.rows[0].count),
        approved: Number(approved.rows[0].count),
        rejected: Number(rejected.rows[0].count),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}