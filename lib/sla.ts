export function calculateSLADate(days: number = 7) {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date;
}


export type SLAInfo = {
  totalDays: number;
  completedDays: number;
  remainingDays: number;
  deadline: string;
  isOverdue: boolean;
  progressPercent: number;
};


const MS_PER_DAY = 1000 * 60 * 60 * 24;


/**
 * Calculates SLA progress based on:
 * - Application submission date
 * - SLA deadline date
 * - Current date
 */
export function getSLAInfo(
  createdAt: Date,
  slaDueDate: Date,
  totalDays: number = 7
): SLAInfo {

  const now = new Date();


  // Days already passed since submission
  const elapsedDays = Math.floor(
    (now.getTime() - createdAt.getTime()) /
      MS_PER_DAY
  );


  // Remaining time until deadline
  const remainingMs =
    slaDueDate.getTime() - now.getTime();


  const remainingDays = Math.max(
    0,
    Math.ceil(remainingMs / MS_PER_DAY)
  );


  const completedDays = Math.min(
    totalDays,
    Math.max(0, elapsedDays)
  );


  const progressPercent = Math.min(
    100,
    Math.round(
      (completedDays / totalDays) * 100
    )
  );


  return {

    totalDays,

    completedDays,

    remainingDays,

    deadline:
      formatDate(slaDueDate),

    isOverdue:
      remainingMs < 0,

    progressPercent,

  };
}



export function formatDate(date: Date) {

  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

}