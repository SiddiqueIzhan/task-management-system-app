import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeveloperBoard } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoList } from "react-icons/io5";
import {
  cardItemType,
  listColumnsType,
  optionsType,
  ToggleDataType,
} from "../Utils/types";

export const ViewData: ToggleDataType[] = [
  {
    show: "List",
    icon: IoList,
  },
  {
    show: "Board",
    icon: MdDeveloperBoard,
  },
];

export const togglePopSection: ToggleDataType[] = [
  {
    show: "DETAILS",
  },
  {
    show: "ACTIVITY",
  },
];

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
