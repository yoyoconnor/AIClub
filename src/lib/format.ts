/** Formats an ISO `YYYY-MM-DD` string as a local date, avoiding UTC offset drift. */
export const formatEventDate = (dateStr: string) =>
  new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
