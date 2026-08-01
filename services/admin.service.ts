export async function getDashboardStats() {
  const response = await fetch("/api/admin/dashboard", {
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function getOfficers() {
  const response = await fetch(
    "/api/admin/officers",
    {
      credentials: "include",
    }
  );

  return response.json();
}