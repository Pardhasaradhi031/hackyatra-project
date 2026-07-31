export interface CreateApplicationRequest {
  applicationType: "Birth" | "Death";

  // Birth
  childName?: string;
  fatherName?: string;
  motherName?: string;
  hospitalName?: string;
  dateOfBirth?: string;

  // Death
  deceasedName?: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  causeOfDeath?: string;
  address?: string;
}

export interface CreateApplicationResponse {
  success: boolean;
  message: string;
}