import { NextResponse } from "next/server";
import { getCurrentUser } from "./current-user";

export async function requireRole(
  allowedRoles: string[]
) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      error: NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      ),
    };
  }

  return { user };
}