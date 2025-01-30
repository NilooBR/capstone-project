import { format, parse, isValid } from "date-fns";

export function formatDateForDisplay(date) {
  return isValid(new Date(date)) ? format(new Date(date), "dd.MM.yyyy") : "";
}

export function formatDeadlineForDatabase(deadline) {
  const parsedDate = parse(deadline, "dd.MM.yyyy", new Date());
  return isValid(parsedDate) ? parsedDate.toISOString() : null;
}
