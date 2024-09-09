import { format } from 'date-fns';

export const getSchedule = async (date: Date) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar?date=${format(date, 'yyyy-MM-dd')}`,
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const data = await response.json();

    return data;
  }
};

export const getUpcomingSchedule = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar/upcoming`,
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const data = await response.json();

    return data;
  }
};
