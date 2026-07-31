import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

import {
  getDashboardStats,
  getRecentApplications,
} from "@/lib/repositories/dashboard.repository";

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

    if (user.role !== "Citizen") {
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

    const stats = await getDashboardStats(user.id);

    const recentApplications =
      await getRecentApplications(user.id);

    return NextResponse.json({
      success: true,
      stats,
      recentApplications,
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