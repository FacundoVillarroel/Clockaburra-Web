import { DateTime } from "luxon";
import React from "react";

import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import Colors from "../../constants/Colors";

import {
  MonthSelectorContainer,
  Label,
  Input,
  ControlArrow,
} from "./monthSelector.styles.js";

const MonthSelector = ({ monthSelected, setMonth }) => {
  const getMonthInputValue = (isoDate) => {
    const date = DateTime.fromISO(isoDate);
    const year = date.year;
    const month = String(date.month).padStart(2, "0");
    return `${year}-${month}`;
  };

  const handleMonthChange = (event) => {
    const monthValue = event.target.value;
    const [year, month] = monthValue.split("-").map(Number);
    const dateTime = DateTime.fromObject({
      year,
      month,
    });
    setMonth(dateTime.toISO());
  };

  const handlePrevMonth = () => {
    const prevMonth = DateTime.fromISO(monthSelected).minus({ month: 1 });
    setMonth(prevMonth.toISO());
  };

  const handleNextMonth = () => {
    const nextMonth = DateTime.fromISO(monthSelected).plus({ month: 1 });
    setMonth(nextMonth.toISO());
  };

  return (
    <MonthSelectorContainer>
      <Label htmlFor="month">Select month:</Label>
      <ControlArrow onClick={handlePrevMonth}>
        <LuArrowLeft color={Colors.primary} />
      </ControlArrow>
      <Input
        type="month"
        id="month"
        name="month"
        onChange={handleMonthChange}
        value={getMonthInputValue(monthSelected)}
      />
      <ControlArrow onClick={handleNextMonth}>
        <LuArrowRight color={Colors.primary} />
      </ControlArrow>
    </MonthSelectorContainer>
  );
};

export default MonthSelector;
