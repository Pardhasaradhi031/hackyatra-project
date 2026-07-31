import {
  CreateApplicationRequest,
  CreateApplicationResponse,
} from "@/types/application";

export async function createApplication(
  data: CreateApplicationRequest
): Promise<CreateApplicationResponse> {
  const response = await fetch("/api/applications", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}