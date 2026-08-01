import { formatDate } from "./sla";
 
export type TimelineStatus = "completed" | "current" | "pending";
 
export type TimelineStage = {
  title: string;
  date: string | null;
  status: TimelineStatus;
};
 
// Fixed process flow, in order.
export const STAGE_ORDER = [
  "Application Submitted",
  "Document Verification",
  "Officer Approval",
  "Certificate Issued",
] as const;
 
// Maps whatever string is stored in applications.current_stage to a
// STAGE_ORDER entry. Update this if the values used by your officer
// dashboard differ from these.
const STAGE_ALIASES: Record<string, (typeof STAGE_ORDER)[number]> = {
  Submitted: "Application Submitted",
  "Application Submitted": "Application Submitted",
  "Document Verification": "Document Verification",
  "Waiting for Officer": "Officer Approval",
  "Officer Approval": "Officer Approval",
  "Certificate Issued": "Certificate Issued",
};
 
/**
 * NOTE: the current schema only stores `current_stage` + `updated_at`,
 * not a per-stage timestamp. So completed stages before the current one
 * reuse `updated_at` as their date since we have nothing more precise.
 * If you need accurate per-stage dates, add an
 * `application_status_history(application_id, stage, changed_at)` table
 * and swap the logic below to read from it.
 */
export function buildTimeline(
  currentStage: string,
  submittedAt: Date,
  updatedAt: Date
): TimelineStage[] {
  const normalizedCurrent = STAGE_ALIASES[currentStage] ?? STAGE_ORDER[0];
  const currentIndex = STAGE_ORDER.indexOf(normalizedCurrent);
 
  return STAGE_ORDER.map((title, index) => {
    let status: TimelineStatus = "pending";
    if (index < currentIndex) status = "completed";
    else if (index === currentIndex) status = "current";
 
    let date: string | null = null;
    if (index === 0) {
      date = formatDate(submittedAt);
    } else if (status === "completed" || status === "current") {
      date = formatDate(updatedAt);
    }
 
    return { title, date, status };
  });
}
