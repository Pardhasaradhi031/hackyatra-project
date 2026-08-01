import { NextRequest, NextResponse } from "next/server";
import { getApplications } from "@/services/application.service";

export async function GET(req: NextRequest) {
  try {
    const applications = await getApplications();

    return NextResponse.json({
      success: true,
      applications,
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