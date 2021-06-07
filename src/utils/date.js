const doubleDigits = number => (Math.floor(number / 10) === 0 ? '0' + number : number);

export const dateToString = (date, format = 'YYYY-MM-DD') => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let result = format;
  result = result.replace('YYYY', year);
  result = result.replace('YY', year % 100);

  result = result.replace('MM', doubleDigits(month));
  result = result.replace('M', month);

  result = result.replace('DD', doubleDigits(day));
  result = result.replace('D', day);

  return result;
};

export default { dateToString };
