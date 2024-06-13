import React, { useState } from "react";
import Input from "../input/Input";

import { Button } from "./form.styles";

const Form = ({ onSubmit, fields }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.value || "";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <Input
          key={index}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          options={field.options || []}
        />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
