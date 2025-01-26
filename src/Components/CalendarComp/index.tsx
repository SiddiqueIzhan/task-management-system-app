import Calendar from "react-calendar";
import { Value } from "../../Utils/types";

interface CalendarComp {
  dateValue: Value;
  onChangeDate: React.Dispatch<React.SetStateAction<Value>>;
}

const CalendarComp = ({ dateValue, onChangeDate }: CalendarComp) => {
  return <Calendar onChange={onChangeDate} value={dateValue} />;
};

export default CalendarComp;
