import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/current-user";
import { hashPassword } from "@/lib/auth";
import {
  createUser,
  findUserByEmail,
} from "@/lib/repositories/user.repository";


export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const {
      name,
      email,
      password,
      wardId,
    } = body;

    if (
      !name ||
      !email ||
      !password ||
      !wardId
    ) {
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

    const existing =
      await findUserByEmail(email);

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword =
      await hashPassword(password);

    const officer =
      await createUser(
        name,
        email,
        hashedPassword,
        "Officer",
        wardId
      );

    return NextResponse.json(
      {
        success: true,
        message: "Officer created successfully",
        officer,
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

    const { rows } = await pool.query(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,
        w.id AS ward_id,
        w.ward_number,
        w.ward_name
      FROM users u
      LEFT JOIN wards w
        ON u.ward_id = w.id
      WHERE u.role = 'Officer'
      ORDER BY w.ward_number, u.name;
    `);

    return NextResponse.json({
      success: true,
      officers: rows,
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

export async function DELETE(req: NextRequest) {
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

    const { id } = await req.json();

    await pool.query(
      `
      DELETE FROM users
      WHERE id = $1
      AND role = 'Officer'
      `,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Officer deleted successfully",
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