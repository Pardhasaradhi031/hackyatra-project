export interface CreateOfficerRequest {
  name: string;
  email: string;
  password: string;
  ward_id: string;
}

export interface Officer {
  id: string;
  name: string;
  email: string;
  role: "Officer";
  ward_id: string;
  created_at?: string;
}

export interface CreateOfficerResponse {
  success: boolean;
  message: string;
  officer?: Officer;
}

export interface GetOfficersResponse {
  success: boolean;
  message?: string;
  officers?: Officer[];
}