import styled from "styled-components";
import Colors from "../constants/Colors";
import { DateTime } from "luxon";

const CellContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CellContent = styled.div`
  margin: 0;
  border: 1.3px solid ${(props) => props.color || Colors.secondary};
  border-radius: 10px;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  align-self: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: ${(props) => props.color || Colors.secondary};
  cursor: pointer;
`;

export const renderShiftCell = (value, row) => {
  return (
    <CellContainer>
      <CellContent color={value ? null : "black"}>
        {value ? `${value.startTime} - ${value.endTime}` : "No Shift"}
      </CellContent>
    </CellContainer>
  );
};

export const getDayOfWeek = (colIndex, startDate) => {
  if (colIndex < 2 || colIndex > 8) return null;

  const start = DateTime.fromISO(startDate);

  const daysToAdd = colIndex - 2;

  const resultDate = start.plus({ days: daysToAdd });

  return resultDate.toISO();
};
