import { CreateOfficerRequest, CreateOfficerResponse, GetOfficersResponse } from "@/types/officer";

export async function createOfficer(data: CreateOfficerRequest): Promise<CreateOfficerResponse> {
  const response = await fetch("/api/admin/officers", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getOfficers(): Promise<GetOfficersResponse> {
  const response = await fetch("/api/admin/officers", {
    method: "GET",
    credentials: "include",
  });
  return response.json();
}