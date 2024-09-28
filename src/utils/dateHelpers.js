import { DateTime } from "luxon";

const dateFormat = "ccc, dd LLL";
const dateInputFormat = "'yyyy-LL-dd'T'HH:mm'";

const getEndOfWeek = (date = DateTime.local()) => {
  let dateObj = date;
  if (typeof dateObj === "string") {
    dateObj = DateTime.fromFormat(date, dateFormat);
  }
  return dateObj.endOf("week").toFormat(dateFormat);
};

const getEndOfWeekISO = (dateTime = DateTime.local()) => {
  return dateTime
    .endOf("week")
    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
    .toISO();
};

const getStartOfWeekISO = (dateTime = DateTime.local()) => {
  return dateTime
    .startOf("week")
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toISO();
};

const getStartOfMonthISO = (dateTime = DateTime.local()) => {
  return dateTime
    .startOf("month")
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toISO();
};

const getEndOfMonthISO = (dateTime = DateTime.local()) => {
  return dateTime
    .endOf("month")
    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
    .toISO();
};

const formatJsDateToLuxonISO = (jsDate) => {
  try {
    const isoString = jsDate.toISOString();
    const DateTimeObj = DateTime.fromISO(isoString);
    const formattedDate = DateTimeObj.toISO();
    return formattedDate;
  } catch (error) {
    console.error(error);
  }
};

export {
  getStartOfMonthISO,
  getStartOfWeekISO,
  getEndOfWeek,
  getEndOfWeekISO,
  getEndOfMonthISO,
  formatJsDateToLuxonISO,
  dateFormat,
  dateInputFormat,
};
