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

export interface ApplicationDetails {
  id: string;
  application_number: string;
  application_type: string;

  child_name?: string;
  father_name?: string;
  mother_name?: string;
  hospital_name?: string;
  date_of_birth?: string;

  deceased_name?: string;
  date_of_death?: string;
  place_of_death?: string;
  cause_of_death?: string;
  address?: string;

  status: string;
  current_stage: string;
  submitted: string;

  sla: {
    deadline: string;
    remainingDays: number;
    progressPercent: number;
    isOverdue: boolean;
  };

  timeline: {
    stage: string;
    date: string;
  }[];
}