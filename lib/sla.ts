export function calculateSLADate(days: number = 7) {
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date;
}