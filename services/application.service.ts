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

export async function getApplications() {
  const response = await fetch("/api/applications", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch applications");
  }

  return data;
}