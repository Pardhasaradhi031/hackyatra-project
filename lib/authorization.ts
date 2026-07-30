export function authorize(
  userRole: string,
  allowedRoles: string[]
) {
  return allowedRoles.includes(userRole);
}