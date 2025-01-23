import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { cardItemType, listColumnsType, optionsType } from "../Utils/types";

export const ViewData = ["List", "Board"];
export const SectionData = ["DETAILS", "ACTIVITY"];

export const taskOptions: optionsType[] = [
  {
    icon: BiSolidEditAlt,
    opt: "Edit",
  },
  {
    icon: RiDeleteBin5Fill,
    opt: "Delete",
  },
];

export const listColumns: listColumnsType[] = [
  {
    label: "Task Name",
    dataField: "title",
  },
  {
    label: "Due on",
    dataField: "due_date",
  },
  {
    label: "Task Status",
    dataField: "status",
  },
  {
    label: "Category",
    dataField: "category",
  },
];

export const statusOptions: optionsType[] = [
  {
    opt: "TO-DO",
  },
  {
    opt: "IN-PROGRESS",
  },
  {
    opt: "COMPLETED",
  },
];

export const categoryOptions: optionsType[] = [
  {
    opt: "WORK",
  },
  {
    opt: "PERSONAL",
  },
];

export const cardDetails: cardItemType[] = [
  {
    title: "Todo",
    status: "TO-DO",
    emptyPlaceHolder: "No Tasks in To-Do",
  },
  {
    title: "In Progress",
    status: "IN-PROGRESS",
    emptyPlaceHolder: "No Tasks In Progress",
  },
  {
    title: "Completed",
    status: "COMPLETED",
    emptyPlaceHolder: "No Completed Tasks",
  },
];
