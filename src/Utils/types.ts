import { IconType } from "react-icons";

export interface tasksDataType {
  id: string;
  [key: string]: string;
}

export interface optionsType {
  icon?: IconType;
  opt: string;
}

export interface listColumnsType {
  label: string;
  dataField: string;
}

export interface cardItemType {
  title: string;
  status: statusType;
  emptyPlaceHolder: string;
}

export interface ToggleDataType {
  show: ViewType | string;
  icon?: IconType;
}

export interface eventLogType {
  activity?: string;
  timeStamp?: string;
}

export type OptionType = "category" | "status" | "task" | "calendar" | null;

export type EventType = "add" | "edit" | null;

export type filterType = "WORK" | "PERSONAL" | null;

export type statusType = "TO-DO" | "IN-PROGRESS" | "COMPLETED" | null;

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type ViewType = "List" | "Board";
