export type DashboardStats = {
  citizens: number;
  officers: number;
  applications: number;
  pending: number;
  approved: number;
  rejected: number;
};

export type DashboardResponse = {
  success: boolean;
  stats: DashboardStats;
};

export type Officer = {
  id: string;
  name: string;
  email: string;

  ward_id: number;

  ward_number: number;

  ward_name: string;
};