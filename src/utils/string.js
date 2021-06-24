export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;
export const MS_PER_MONTH = 30 * MS_PER_DAY;
export const MS_PER_YEAR = 12 * MS_PER_MONTH;

export const calcTimeRangeUntilNow = (date) => {
  if (!date) return "Vừa mới đăng";
  const today = Date.now();
  let dateRange = today - date;

  const types = ["năm", "tháng", "ngày", "giờ", "phút", "giây"];
  let timeRanges = [];
  const calcRangeTypes = (time) => {
    timeRanges.push(Math.floor(dateRange / time));
    dateRange %= time;
  };

  calcRangeTypes(MS_PER_YEAR);
  calcRangeTypes(MS_PER_MONTH);
  calcRangeTypes(MS_PER_DAY);
  calcRangeTypes(MS_PER_HOUR);
  calcRangeTypes(MS_PER_MINUTE);
  calcRangeTypes(MS_PER_SECOND);

  const resultIndex = timeRanges.findIndex((val) => val > 0);
  if (!timeRanges[resultIndex] || !types[resultIndex]) return "Vừa mới đăng";
  return `${timeRanges[resultIndex]} ${types[resultIndex]} trước`;
};
