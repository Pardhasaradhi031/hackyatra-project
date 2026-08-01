import { NextRequest, NextResponse } from "next/server";

import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentUser();

    if (!admin) {
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

    if (admin.role !== "Admin") {
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

    const { id } = await params;

    const { rows } = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        ward_id
      FROM users
      WHERE id = $1
      AND role = 'Officer'
      `,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Officer not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      officer: rows[0],
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
    const admin = await getCurrentUser();

    if (!admin) {
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

    if (admin.role !== "Admin") {
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

    const { id } = await params;

    const body = await req.json();

    const {
      name,
      email,
      wardId,
    } = body;

    if (!name || !email || !wardId) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const { rows } = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2,
        ward_id = $3
      WHERE
        id = $4
        AND role = 'Officer'
      RETURNING
        id,
        name,
        email,
        ward_id
      `,
      [
        name,
        email,
        wardId,
        id,
      ]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Officer not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Officer updated successfully",
      officer: rows[0],
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