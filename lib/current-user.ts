import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { findUserById } from "@/lib/repositories/user.repository";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyToken(token);

    const user = await findUserById(payload.id);

    return user ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}