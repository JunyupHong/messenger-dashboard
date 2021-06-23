const MONDAY = 1;
const doubleDigits = (number: number): string =>
  Math.floor(number / 10) === 0 ? '0' + number : String(number);

export const dateToString = (date: Date, format = 'YYYY-MM-DD') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return format
    .replace('YYYY', String(year))
    .replace('YY', String(year % 100))
    .replace('MM', doubleDigits(month))
    .replace('M', String(month))
    .replace('DD', doubleDigits(day))
    .replace('D', String(day));
};

export const getWeekNumber = (date: Date) => {
  const compare = new Date(new Date(date).setDate(1));
  while (compare.getDay() !== MONDAY) {
    compare.setDate(compare.getDate() + 1);
  }
  if (compare > date) {
    compare.setMonth(compare.getMonth() - 1);
    while (compare.getDay() !== MONDAY) {
      compare.setDate(compare.getDate() + 1);
    }
  }
  let weekNumber = 0;
  while (compare <= date) {
    weekNumber++;
    compare.setDate(compare.getDate() + 7);
  }
  return weekNumber;
};

export default { dateToString, getWeekNumber };
