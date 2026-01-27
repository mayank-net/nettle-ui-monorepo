import moment, { Moment } from "moment";

export function isNumeric(n: unknown): n is number {
  return !isNaN(parseFloat(n as string)) && isFinite(n as number);
}

function getFullDateGMTFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment.utc(ts).format("DD MMM YYYY HH:mm:ss");
}

function getFullDateLocalFormatWithTime(timestamp: number | string): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("DD MMM YYYY, hh:mm A");
}

function getFullDateLocalFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("DD MMM YYYY HH:mm:ss ZZ");
}

function getHourFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("DD MMM [at] HH:mm");
}

function getCalendarDateFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  const isToday = moment(ts).isSame(moment(), "day");
  if (isToday) {
    return `Today . ${moment(ts).format("h:mm A")}`;
  }
  return moment(ts).format("DD MMM . h:mm A");
}

function getShortDateFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("DD MMM YY");
}

function getShortTimeFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("h:mm A");
}

function getMonthDateFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("MMM DD");
}

function getMonth(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("MMM");
}

function getDate(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("DD");
}

function getFullYearDateFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("DD MMM YYYY");
}

function getFullYearMonthDateFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("MMM DD, YYYY");
}

function getMonthFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("MMM YY");
}

function getMonthFullYearFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("MMMM YYYY");
}

function getYearFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("YYYY");
}

function getQuarterFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("[Q]Q YY");
}

function getIntervalFormat(prevDate: Moment, nextDate: Moment): string {
  if (prevDate.year() !== nextDate.year()) {
    return `${prevDate.format("DD MMM YY")} - ${nextDate.format("DD MMM YY")}`;
  }
  if (prevDate.month() !== nextDate.month()) {
    return `${prevDate.format("DD MMM")} - ${nextDate.format("DD MMM YY")}`;
  }
  return `${prevDate.format("DD")} - ${nextDate.format("DD MMM YY")}`;
}

function getWeekFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  const date = moment(ts);
  let nextDate = moment(ts).add(6, "d");
  if (nextDate.isAfter(moment())) {
    nextDate = moment();
  }
  return getIntervalFormat(date, nextDate);
}

function getPastWeekFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  const date = moment(ts);
  const prevDate = moment(ts).subtract(6, "d");
  return getIntervalFormat(prevDate, date);
}

function getMinutesFormat(timestamp: number | string | null): string {
  const ts = isNumeric(timestamp) ? Number(timestamp) : timestamp;
  return moment(ts).format("mm:ss");
}

function emptyFn(params: number): string {
  return String(params);
}

function getUnixTimestamp(date: string): number {
  return moment(date).valueOf();
}

const MONTH_DATE_MAPPING: { [key: string]: string } = {
  Jan: "01-01",
  Feb: "02-01",
  Mar: "03-01",
  Apr: "04-01",
  May: "05-01",
  Jun: "06-01",
  Jul: "07-01",
  Aug: "08-01",
  Sep: "09-01",
  Oct: "10-01",
  Nov: "11-01",
  Dec: "12-01",
};

function getDateFromShortMonth(date: string): string {
  return MONTH_DATE_MAPPING[date];
}

type Rollup = "quarter" | "hour" | "day" | "week" | "year" | "month";

const rollupDateFormatterMap = {
  quarter: getQuarterFormat,
  hour: getHourFormat,
  day: getShortDateFormat,
  week: getWeekFormat,
  year: getYearFormat,
  month: getMonthFormat,
};

export function getDateFormatterForRollup(
  rollup: Rollup | "none"
): (timestamp: string | number | null) => string {
  if (rollup === "none") {
    return emptyFn;
  }
  return rollupDateFormatterMap[rollup] || emptyFn;
}

function formatDateOrTimeDifference(inputDate: string) {
  const currentDate = moment();
  const targetDate = moment(inputDate);

  const diffInSeconds = currentDate.diff(targetDate, "seconds");
  const diffInMinutes = currentDate.diff(targetDate, "minutes");
  const diffInHours = currentDate.diff(targetDate, "hours");
  const diffInDays = currentDate.diff(targetDate, "days");

  if (diffInDays <= 7) {
    // Return time difference in seconds, minutes, hours, or days ago
    if (diffInDays < 1) {
      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
      } else if (diffInHours < 2) {
        return `${diffInHours} hour ago`;
      } else {
        return `${diffInHours} hours ago`;
      }
    } else if (diffInDays < 2) {
      return "1 day ago";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return "1 week ago";
    }
  } else {
    // Return date in specified format
    return targetDate.format("Do MMMM YYYY, h:mma");
  }
}

export {
  getFullDateGMTFormat,
  getFullDateLocalFormat,
  getHourFormat,
  getShortDateFormat,
  getMonthFormat,
  getYearFormat,
  getIntervalFormat,
  getQuarterFormat,
  getWeekFormat,
  getMinutesFormat,
  getPastWeekFormat,
  getFullYearDateFormat,
  getFullYearMonthDateFormat,
  getFullDateLocalFormatWithTime,
  getCalendarDateFormat,
  getMonthFullYearFormat,
  getUnixTimestamp,
  getMonthDateFormat,
  getShortTimeFormat,
  getMonth,
  getDate,
  getDateFromShortMonth,
  formatDateOrTimeDifference,
};
