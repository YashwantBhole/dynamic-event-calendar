import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";

export const generateCalendar = (currentDate) => {
  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));

  const days = [];
  let date = startDate;

  while (date <= endDate) {
    days.push(date);
    date = addDays(date, 1);
  }

  return days;
};

export const isSameDay = (date1, date2) => format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
