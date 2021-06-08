const doubleDigits = number => (Math.floor(number / 10) === 0 ? '0' + number : number);

export const dateToString = (date, format = 'YYYY-MM-DD') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return format
    .replace('YYYY', year)
    .replace('YY', year % 100)
    .replace('MM', doubleDigits(month))
    .replace('M', month)
    .replace('DD', doubleDigits(day))
    .replace('D', day);
};

export const getWeekNumber = date => {
  const compare = new Date(new Date(date).setDate(1));
  while (compare.getDay() !== 1) {
    compare.setDate(compare.getDate() + 1);
  }
  if (compare > date) {
    compare.setMonth(compare.getMonth() - 1);
    while (compare.getDay() !== 1) {
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
