import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { verifyToken } from "@/lib/auth";
import { findUserById } from "@/lib/repositories/user.repository";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload = verifyToken(token);

    const user = await findUserById(payload.id);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      user,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Invalid or expired token",
      },
      {
        status: 401,
      }
    );
  }
}