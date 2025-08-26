export const postDateFormat = (created_at: Date): string => {
  const diff = Date.now() - new Date(created_at).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) return `${seconds}s`;
  else if (minutes < 60) return `${minutes}m`;
  else if (hours < 24) return `${hours}h`;
  else if (days < 30) return `${days}d`;
  else return `${months}mo`;
};
