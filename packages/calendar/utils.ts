export const ROW_HEIGHT = 64;

export function formatMonthTitle(date: Date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

export function compareMonth(date1: Date | number, date2: Date | number) {
  if (!(date1 instanceof Date)) {
    date1 = new Date(date1);
  }

  if (!(date2 instanceof Date)) {
    date2 = new Date(date2);
  }

  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(day1: Date | number, day2: Date | number) {
  if (!(day1 instanceof Date)) {
    day1 = new Date(day1);
  }

  if (!(day2 instanceof Date)) {
    day2 = new Date(day2);
  }

  const compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();

    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

export function getDayByOffset(date: Date, offset: number) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);

  return date;
}

export function getPrevDay(date: Date) {
  return getDayByOffset(date, -1);
}

export function getNextDay(date: Date) {
  return getDayByOffset(date, 1);
}

export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function calcDateNum(date: [Date, Date]) {
  const day1 = new Date(date[0]).getTime();
  const day2 = new Date(date[1]).getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}

export function copyDates(dates: Date | Date[]) {
  if (Array.isArray(dates)) {
    return dates.map((date) => {
      if (date === null) {
        return date;
      }

      return new Date(date);
    });
  }

  return new Date(dates);
}

export function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate();
}

export function getMonths(minDate: number, maxDate: number) {
  const months: number[] = [];
  const cursor = new Date(minDate);

  cursor.setDate(1);

  do {
    months.push(cursor.getTime());
    cursor.setMonth(cursor.getMonth() + 1);
  } while (compareMonth(cursor, maxDate) !== 1);

  return months;
}
