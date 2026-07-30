export type UserRole = 
"Citizen" |
"Officer" |
"Supervisor" |
"Admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}