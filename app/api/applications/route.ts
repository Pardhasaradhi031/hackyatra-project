import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/current-user";

import { createApplicationSchema } from "@/lib/validation/application.schema";

import { createApplication } from "@/lib/repositories/application.repository";

import { generateApplicationNumber } from "@/lib/application-number";

export async function POST(req: Request) {
  try {
    // Check logged in user
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

    // Only citizens can apply
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

    // Read request body
    const body = await req.json();

    // Validate
    const parsed = createApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    // Generate Application Number
    const applicationNumber =
      await generateApplicationNumber();

    // Save
    const application = await createApplication({
      citizenId: user.id,
      applicationNumber,
      ...parsed.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        application,
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