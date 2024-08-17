import React from "react";

import { FormControl, Label, StyledInput, StyledSelect } from "./input.styles";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  options,
  ...rest
}) => {
  if (type === "select") {
    return (
      <FormControl>
        {label && <Label htmlFor={name}>{label}</Label>}
        <StyledSelect name={name} id={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormControl>
    );
  } else {
    return (
      <FormControl>
        {label && <Label htmlFor={name}>{label}</Label>}
        <StyledInput
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </FormControl>
    );
  }
};

export default Input;
