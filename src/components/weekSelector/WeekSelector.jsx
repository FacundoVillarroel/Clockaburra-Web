import React from "react";
import { DateTime } from "luxon";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

import {
  WeekSelectorContainter,
  Label,
  Input,
  ControlArrow,
} from "./weekSelector.styles.js";
import Colors from "../../constants/Colors";

const WeekSelector = ({ weekSelected, setWeek }) => {
  const getWeekInputValue = (isoDate) => {
    const date = DateTime.fromISO(isoDate);
    const year = date.weekYear;
    const week = String(date.weekNumber).padStart(2, "0");
    return `${year}-W${week}`;
  };

  const handleWeekChange = (event) => {
    const weekValue = event.target.value;
    const [year, week] = weekValue.split("-W").map(Number);

    const dateTime = DateTime.fromObject({
      weekYear: year,
      weekNumber: week,
    });

    setWeek(dateTime.toISO());
  };

  const handlePrevWeek = () => {
    const prevWeekObj = DateTime.fromISO(weekSelected).minus({ weeks: 1 });
    setWeek(prevWeekObj.toISO());
  };

  const handleNextWeek = () => {
    const nextWeekObj = DateTime.fromISO(weekSelected).plus({ weeks: 1 });
    setWeek(nextWeekObj.toISO());
  };

  return (
    <WeekSelectorContainter>
      <Label htmlFor="week">Select week:</Label>
      <ControlArrow onClick={handlePrevWeek}>
        <LuArrowLeft color={Colors.primary} />
      </ControlArrow>
      <Input
        type="week"
        id="week"
        name="week"
        onChange={handleWeekChange}
        value={getWeekInputValue(weekSelected)}
      />
      <ControlArrow onClick={handleNextWeek}>
        <LuArrowRight color={Colors.primary} />
      </ControlArrow>
    </WeekSelectorContainter>
  );
};

export default WeekSelector;
