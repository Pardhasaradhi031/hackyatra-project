import { formatDate } from "./sla";

export type TimelineStage = {
  stage: string;
  completed: boolean;
  completedAt: string | null;
};

export const STAGE_ORDER = [
  "Application Submitted",
  "Document Verification",
  "Officer Approval",
  "Certificate Issued",
] as const;

const STAGE_ALIASES: Record<string, (typeof STAGE_ORDER)[number]> = {
  Submitted: "Application Submitted",
  "Application Submitted": "Application Submitted",

  "Under Verification": "Document Verification",
  "Document Verification": "Document Verification",

  Verified: "Officer Approval",
  "Officer Approval": "Officer Approval",

  Approved: "Certificate Issued",
  "Certificate Issued": "Certificate Issued",
};

export function buildTimeline(
  currentStage: string,
  submittedAt: Date,
  updatedAt: Date,
): TimelineStage[] {
  const normalizedStage =
    STAGE_ALIASES[currentStage] ?? "Application Submitted";

  const currentIndex = STAGE_ORDER.indexOf(normalizedStage);

  return STAGE_ORDER.map((stage, index) => ({
    stage,
    completed: index <= currentIndex,
    completedAt:
      index <= currentIndex
        ? index === 0
          ? formatDate(submittedAt)
          : formatDate(updatedAt)
        : null,
  }));
}
