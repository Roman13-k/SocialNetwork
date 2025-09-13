import { daysBetween } from "./chatDateFormat";

const curDate = new Date();

export function messageDateFormat(created_at: string) {
  const rafMessageDate = new Date(created_at);
  const diffDays = daysBetween(curDate, rafMessageDate);

  const messageDate =
    diffDays === 0
      ? "Today"
      : diffDays === 1
      ? "Yesterday"
      : rafMessageDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

  return messageDate;
}
