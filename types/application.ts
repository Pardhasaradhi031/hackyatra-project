export interface CreateApplicationRequest {
  applicationType: "Birth" | "Death";
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
}

export interface CreateApplicationResponse {
  success: boolean;
  message: string;
}