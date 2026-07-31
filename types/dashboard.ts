export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface RecentApplication {
  id: string;
  application_number: string;
  application_type: "Birth" | "Death";
  status: string;
  current_stage: string;
  created_at: string;
}

export interface DashboardResponse {
  success: boolean;
  stats: DashboardStats;
  recentApplications: RecentApplication[];
}