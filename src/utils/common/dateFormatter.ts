export function dateFormatter(timestamp: string) {
  if (!timestamp) {
    return;
  }
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  return formattedDate;
}