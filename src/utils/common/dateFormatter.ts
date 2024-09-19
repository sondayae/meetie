export function dateTimeFormatter(timestamp: string) {
  if (!timestamp) {
    return null;
  }
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formattedDate;
}

export function dateFormatter(timestamp: string) {
  if (!timestamp) {
    return null;
  }

  const date = new Date(timestamp);
  let formattedDate = date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  formattedDate = formattedDate.slice(0, -1);

  return formattedDate;
}

export function timeFormatter(timestamp: string) {
  if (!timestamp) {
    return null;
  }
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return formattedDate;
}

export function dateWithDayFormatter(timestamp: string|Date) {
  if (!timestamp) {
    return null;
  }

  const date = new Date(timestamp);
  let formattedDate = date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return formattedDate;
}

