import React, { useState } from "react";
import Input from "../input/Input";
import { LuCalendarClock } from "react-icons/lu";

import {
  Button,
  FormControl,
  StyledInput,
  StyledDatePicker,
} from "./formStyles.js";

const Form = ({ onSubmit, fields, children, submitButtonText = "Submit" }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] =
        field.value || (field.type === "select" ? field.options[0].value : "");
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    let data = {
      ...formData,
      [name]: date,
    };
    if (name === "startDate" && formData.endDate < date) {
      data = {
        ...data,
        endDate: date,
      };
    }
    setFormData(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) =>
        field.type === "datetime-local" ? (
          <FormControl key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <StyledInput>
              <StyledDatePicker
                selected={
                  formData[field.name] ? new Date(formData[field.name]) : null
                }
                onChange={(date) => handleDateChange(field.name, date)}
                showTimeSelect
                showIcon
                icon={<LuCalendarClock />}
                dateFormat="Pp"
                id={field.name}
                autoComplete="off"
                minDate={
                  field.name === "endDate"
                    ? new Date(formData["startDate"])
                    : null
                }
                {...field}
              />
            </StyledInput>
          </FormControl>
        ) : (
          <Input
            key={index}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            options={field.options || []}
            {...field}
          />
        )
      )}
      {children}
      <Button type="submit">{submitButtonText}</Button>
    </form>
  );
};

export default Form;
