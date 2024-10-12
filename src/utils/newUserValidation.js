import { DateTime } from "luxon";

export const newUserValidation = (
  formData,
  rolesOptions,
  departmentsOptions
) => {
  const errors = [];

  // Check for empty values
  const hasEmptyValue = Object.values(formData).some((value) => !value);
  if (hasEmptyValue) {
    errors.push("There are empty values on the form.");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.push("Invalid email address.");
  }

  // Name and Surname validation
  if (formData.name.length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }
  if (formData.surname.length < 2) {
    errors.push("Surname must be at least 2 characters long.");
  }

  // Role validation (must be one of the options)
  const validRoles = rolesOptions.map((role) => role.value);
  if (!validRoles.includes(formData.role)) {
    errors.push("Invalid role selected.");
  }

  // Department validation (must be one of the options)
  const validDepartments = departmentsOptions.map(
    (department) => department.value
  );
  if (!validDepartments.includes(formData.department)) {
    errors.push("Invalid department selected.");
  }

  // Permissions validation (must be either 'user' or 'admin')
  if (!["user", "admin"].includes(formData.permissions)) {
    errors.push("Invalid permissions selected.");
  }

  // Start Date validation
  const startDate = DateTime.fromISO(formData.startDate);
  if (!startDate.isValid) {
    errors.push("Invalid start date.");
  } else if (startDate > DateTime.now()) {
    errors.push("Start date cannot be in the future.");
  }

  // Hourly Rate validation (must be a positive number)
  if (isNaN(formData.hourlyRate) || formData.hourlyRate <= 0) {
    errors.push("Hourly rate must be a positive number.");
  }

  // Return any errors found
  return errors;
};
