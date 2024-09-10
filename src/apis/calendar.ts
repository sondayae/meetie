import { format } from 'date-fns';

export const getSchedule = async (date: Date, id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar/${id}?date=${format(date, 'yyyy-MM-dd')}`,
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const data = await response.json();

    return data;
  }
};

export const getUpcomingSchedule = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar/${id}/upcoming`,
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const data = await response.json();

    return data;
  }
};

export const getDueSoon = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/calendar/${id}/due-soon`,
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message);
  } else {
    const data = await response.json();

    return data;
  }
};
