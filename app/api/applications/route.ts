import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";
import { applicationSchema } from "@/lib/validation/application.schema";
import { generateApplicationNumber } from "@/lib/generate-application-number";
import { calculateSLADate } from "@/lib/sla";

import {
  createApplication,
  getCitizenApplications,
} from "@/lib/repositories/application.repository";

export async function POST(req: Request) {
  try {
    // Authentication
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

    // Authorization
    if (user.role !== "Citizen") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    // Read request body
    const body = await req.json();

    // Validate request
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      applicationType,
      applicantName,
      applicantEmail,
      applicantPhone,
    } = parsed.data;

    // Generate application number
    const applicationNumber =
      await generateApplicationNumber();

    // Calculate SLA
    const slaDueDate =
      calculateSLADate();

    // Save application
    const application =
      await createApplication(
        applicationNumber,
        user.id,
        applicationType,
        applicantName,
        applicantEmail,
        applicantPhone,
        slaDueDate
      );

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

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

    if (user.role !== "Citizen") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const applications =
      await getCitizenApplications(user.id);

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}