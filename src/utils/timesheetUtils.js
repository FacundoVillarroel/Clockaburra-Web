import { DateTime } from "luxon";

// Converts a Date to a time string in HH:MM format.
function formatTime(dateTime) {
  const date = new Date(dateTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Group timesheets by userId.
function groupTimesheetsByUser(timesheets) {
  return timesheets.reduce((acc, timesheet) => {
    const userId = timesheet.userId;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(timesheet);
    return acc;
  }, {});
}

// Formats an employee's timesheets.
function formatTimesheetsForEmployee(timesheets) {
  const result = {};
  timesheets.forEach((timesheet) => {
    const startDate = new Date(timesheet.startDate);
    const dayOfWeek = startDate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase(); // get short weekday name (e.g., 'mon', 'tue')
    result[dayOfWeek] = {
      startTime: formatTime(timesheet.startDate),
      endTime: formatTime(timesheet.endDate),
      timesheetId: timesheet.id,
    };
  });
  return result;
}

// Create an array of employees with their timesheets.
export const createEmployeeTimesheetArray = (employees, timesheets) => {
  const timesheetsByUser = groupTimesheetsByUser(timesheets);

  return employees.map((employee) => {
    const employeeTimesheets = formatTimesheetsForEmployee(
      timesheetsByUser[employee.id] || []
    );
    return {
      employee: `${employee.name} ${employee.surname}`,
      role: employee.role,
      mon: employeeTimesheets.mon || null,
      tue: employeeTimesheets.tue || null,
      wed: employeeTimesheets.wed || null,
      thu: employeeTimesheets.thu || null,
      fri: employeeTimesheets.fri || null,
      sat: employeeTimesheets.sat || null,
      sun: employeeTimesheets.sun || null,
      id: employee.id,
    };
  });
};

export const transformBreaksToISO = (date, breaks) => {
  const startDate = DateTime.fromISO(date);

  const transformedBreaks = breaks.map((breakObj) => {
    const breakStart = startDate
      .set({
        hour: parseInt(breakObj.breakStart.split(":")[0], 10),
        minute: parseInt(breakObj.breakStart.split(":")[1], 10),
      })
      .toISO();

    const breakEnd = startDate
      .set({
        hour: parseInt(breakObj.breakEnd.split(":")[0], 10),
        minute: parseInt(breakObj.breakEnd.split(":")[1], 10),
      })
      .toISO();

    return {
      breakStart,
      breakEnd,
    };
  });
  return transformedBreaks;
};

export const revertBreaksFromISO = (transformedBreaks) => {
  const revertedBreaks = transformedBreaks.map((breakObj) => {
    const breakStart = DateTime.fromISO(breakObj.breakStart).toFormat("HH:mm");
    const breakEnd = DateTime.fromISO(breakObj.breakEnd).toFormat("HH:mm");

    return {
      breakStart,
      breakEnd,
    };
  });

  return revertedBreaks;
};
