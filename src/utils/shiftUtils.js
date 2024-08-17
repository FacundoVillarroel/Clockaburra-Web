// Converts a Date to a time string in HH:MM format.
function formatTime(dateTime) {
  const date = new Date(dateTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Group shifts by userId.
function groupShiftsByUser(shifts) {
  return shifts.reduce((acc, shift) => {
    const userId = shift.userId;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(shift);
    return acc;
  }, {});
}

// Formats an employee's shifts.
function formatShiftsForEmployee(shifts) {
  const result = {};
  shifts.forEach((shift) => {
    const startDate = new Date(shift.startDate);
    const dayOfWeek = startDate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase(); // get short weekday name (e.g., 'mon', 'tue')
    result[dayOfWeek] = {
      startTime: formatTime(shift.startDate),
      endTime: formatTime(shift.endDate),
      shiftId: shift.id,
    };
  });
  return result;
}

// Create an array of employees with their shifts.
function createEmployeeShiftArray(employees, shifts) {
  const shiftsByUser = groupShiftsByUser(shifts);

  return employees.map((employee) => {
    const employeeShifts = formatShiftsForEmployee(
      shiftsByUser[employee.id] || []
    );
    return {
      employee: `${employee.name} ${employee.surname}`,
      role: employee.role,
      mon: employeeShifts.mon || null,
      tue: employeeShifts.tue || null,
      wed: employeeShifts.wed || null,
      thu: employeeShifts.thu || null,
      fri: employeeShifts.fri || null,
      sat: employeeShifts.sat || null,
      sun: employeeShifts.sun || null,
      id: employee.id,
    };
  });
}

module.exports = {
  createEmployeeShiftArray,
};
