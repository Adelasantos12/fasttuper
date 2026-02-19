import { DateTime } from 'luxon';

export const TIMEZONE = 'America/Mexico_City';

export function getNow(): DateTime {
  return DateTime.now().setZone(TIMEZONE);
}

export function isBeforeCutoff(date: DateTime = getNow()): boolean {
  // Wednesday is 3
  // 23:59:59 is cutoff
  if (date.weekday < 3) return true;
  if (date.weekday === 3) {
    return date.hour < 23 || (date.hour === 23 && date.minute < 59);
  }
  return false;
}

export function getNextMonday(): DateTime {
  const current = getNow();
  // Luxon weeks start on Monday by default in ISO
  let nextMonday = current.startOf('week').plus({ weeks: 1 });

  // If we are past cutoff (Wednesday 23:59), start the week after next
  if (!isBeforeCutoff(current)) {
    nextMonday = nextMonday.plus({ weeks: 1 });
  }
  return nextMonday;
}
