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

const getStartOfWeek = (date = DateTime.local()) => {
  let dateObj = date;
  if (typeof dateObj === "string") {
    dateObj = DateTime.fromFormat(date, dateFormat);
  }
  return dateObj.startOf("week").toFormat(dateFormat);
};

const formatJsDateToLuxonIso = (jsDate) => {
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
  getStartOfWeek,
  getEndOfWeek,
  formatJsDateToLuxonIso,
  dateFormat,
  dateInputFormat,
};
