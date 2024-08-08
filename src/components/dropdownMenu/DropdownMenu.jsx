import React, { useState } from "react";
import { LuFilter } from "react-icons/lu";
import {
  DropdownContainer,
  DropdownButton,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
} from "./dropdownMenu.styles";

const DropdownMenu = ({ label, items }) => {
  const [selected, setSelected] = useState(items);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    if (selected.includes(name)) {
      setSelected((prevValue) => prevValue.filter((item) => item !== name));
    } else {
      setSelected((prevValue) => [...prevValue, name]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items);
    }
  };

  const getCheckedStatus = (name) => {
    return selected.includes(name);
  };

  const getAllCheckedStatus = () => {
    return selected.length === items.length;
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleOpen}>
        <LuFilter />
        <span>{label}</span>
      </DropdownButton>
      <DropdownContent open={open}>
        <DropdownLabel>{label}</DropdownLabel>
        <DropdownSeparator />
        <DropdownCheckboxItem>
          <input
            type="checkbox"
            name={label}
            onChange={handleSelectAll}
            checked={getAllCheckedStatus()}
          />
          <span>All {label}</span>
        </DropdownCheckboxItem>
        <DropdownSeparator />
        {items.map((item) => (
          <React.Fragment key={item}>
            <DropdownCheckboxItem>
              <input
                type="checkbox"
                name={item}
                onChange={handleCheckboxChange}
                checked={getCheckedStatus(item)}
              />
              {item}
            </DropdownCheckboxItem>
          </React.Fragment>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownMenu;
