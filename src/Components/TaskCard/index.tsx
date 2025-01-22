import React from "react";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { listColumns, statusOptions, taskOptions } from "../data";
import { SlOptions } from "react-icons/sl";
import styles from "../CardContainer/CardContainer.module.scss";
import { useAppContext } from "../../Context/appContext";
import {
  cardItemType,
  listColumnsType,
  tasksDataType,
} from "../../Utils/types";
import { HiCheckCircle } from "react-icons/hi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  id: string;
  item: tasksDataType;
  cardItem: cardItemType;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, item, cardItem }) => {
  const {
    isOptPopUp,
    activeIndex,
    optionType,
    handleShowOptions,
    View,
    handleCheckboxChange,
  } = useAppContext();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.id,
      data: {
        type: "Card",
        item: item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    backgroundColor: isDragging && View === "List" ? "#f9f9f9" : "",
    borderRadius: isDragging && View === "List" ? "8px" : "",
    boxShadow: isDragging ? "0px 4px 4px 0px #0000001a" : "none",
    zIndex: isDragging ? 2 : 0,
    position: "relative",
  };

  const getStyleClass = (cardItem: cardItemType) => {
    if (cardItem.status === "TO-DO") return "w-[66.53px]";
    else if (cardItem.status === "IN-PROGRESS") return "w-[115.31px]";
    else if (cardItem.status === "COMPLETED") {
      return "w-[105.38px]";
    }
  };

  return (
    <div className="w-full relative flex">
      {View === "List" && (
        <span className="item-center gap-2 absolute z-10 top-4 left-3">
          <input
            type="checkbox"
            name={item.id}
            id={item.id}
            value={item.id}
            onChange={(e) => {
              handleCheckboxChange(item.id, e.target.checked);
            }}
            className={styles.checkbox}
          />
          <HiCheckCircle className={styles.check} />
        </span>
      )}
      <div
        className={`${styles.taskItem} ${
          View === "Board" ? styles.boardTask : ""
        }`}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        {listColumns.map((column: listColumnsType, colIndex) => (
          <span
            key={colIndex}
            className={`${styles.taskColumn} ${
              View === "Board" ? styles.boardColumn : ""
            }`}
          >
            <span className={styles.columnText}>{item[column.dataField]}</span>
          </span>
        ))}
      </div>
      {View === "List" && (
        <>
          <div
            className={`${getStyleClass(
              cardItem
            )} h-7 rounded-sm absolute top-2.5 left-1/2 translate-x-12 z-10 hidden md:inline`}
            onClick={() => {
              handleShowOptions(id, "status");
            }}
          ></div>
          {isOptPopUp && id === activeIndex && optionType === "status" && (
            <OptionsPopUp
              options={statusOptions}
              className="absolute top-12 left-1/2 translate-x-12 py-3 px-[14px] gap-3 z-50"
            />
          )}
        </>
      )}
      <SlOptions
        className={`${styles.options}`}
        onClick={() => {
          handleShowOptions(id, "task");
        }}
      />

      {isOptPopUp && id === activeIndex && optionType === "task" && (
        <OptionsPopUp
          options={taskOptions}
          className="absolute right-0 top-[34px] p-4 w-[134px] gap-2 z-10"
        />
      )}
    </div>
  );
};

export default TaskCard;
