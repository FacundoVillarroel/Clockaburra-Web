import React, { useState, useEffect } from "react";
import { LuFilter } from "react-icons/lu";
import {
  DropdownContainer,
  DropdownButton,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
} from "./dropdownMenuStyles.js";

const DropdownMenu = ({ label, items, checked, setValues }) => {
  const [selected, setSelected] = useState(items);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (items.length) {
      setSelected(items);
    }
  }, [items]);

  const handleCheckboxChange = (e) => {
    const { name } = e.target;
    let updatedSelected;
    if (selected.includes(name)) {
      updatedSelected = selected.filter((item) => item !== name);
    } else {
      updatedSelected = [...selected, name];
    }
    setIsAllChecked(updatedSelected.length === items.length);
    setSelected(updatedSelected);
    setValues(label, updatedSelected);
  };

  const handleSelectAll = () => {
    const updatedSelected = selected.length === items.length ? [] : items;
    setIsAllChecked(updatedSelected.length === items.length);
    setSelected(updatedSelected);
    setValues(label, updatedSelected);
  };

  const getCheckedStatus = (name) => {
    return selected.includes(name);
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
            checked={isAllChecked}
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
