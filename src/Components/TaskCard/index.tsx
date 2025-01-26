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
    listView,
    handleCheckboxChange,
    selectedValues,
    eventType,
    setEventType,
  } = useAppContext();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item ? item.id : `empty-placeholder-${cardItem.status}`,
      data: {
        item: item ? item : "empty-placeholder", // Pass the item or placeholder
        status: cardItem.status, // Status of the card
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    backgroundColor: isDragging && listView ? "#f9f9f9" : "",
    borderRadius: isDragging && listView ? "8px" : "",
    boxShadow: isDragging ? "0px 4px 4px 0px #0000001a" : "none",
    zIndex: isDragging ? 2 : 0,
  };

  const getStyleClass = (cardItem: cardItemType) => {
    if (cardItem.status === "TO-DO") return "w-[66.53px]";
    else if (cardItem.status === "IN-PROGRESS") return "w-[115.31px]";
    else if (cardItem.status === "COMPLETED") {
      return "w-[105.38px]";
    }
  };

  return (
    <div className="w-full relative -z-1">
      <div
        className={`${styles.taskItem} ${!listView ? styles.boardTask : ""}`}
        ref={setNodeRef}
        {...attributes}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {listView && (
          <span className="item-center gap-2 absolute z-10 top-4 left-3">
            <input
              type="checkbox"
              name={item.id}
              id={item.id}
              value={item.id}
              checked={selectedValues.includes(item.id)}
              onChange={(e) => {
                handleCheckboxChange(item.id, e.target.checked);
              }}
              className={styles.checkbox}
            />
            <HiCheckCircle className={styles.check} />
          </span>
        )}
        <div {...listeners} className={styles.taskElements}>
          {listColumns.map((column: listColumnsType, colIndex) => (
            <>
              <span
                key={colIndex}
                className={`${styles.taskColumn} ${
                  !listView ? styles.boardColumn : ""
                }`}
              >
                <span className={styles.columnText}>
                  {item[column.dataField]}
                </span>
              </span>
            </>
          ))}
        </div>
        <SlOptions
          className={`${styles.options}`}
          onClick={() => {
            setEventType("task");
            handleShowOptions(id, "task");
          }}
        />
      </div>
      {isOptPopUp &&
        id === activeIndex &&
        optionType === "task" &&
        eventType === "task" && (
          <OptionsPopUp
            options={taskOptions}
            className="absolute right-0 top-[34px] p-4 w-[134px] gap-2 z-50"
            event={eventType}
          />
        )}
      {listView && (
        <>
          <div
            className={`${getStyleClass(
              cardItem
            )} h-7 rounded-sm absolute top-2.5 left-1/2 xl:translate-x-12 z-10 hidden md:inline lg:translate-x-32`}
            onClick={() => {
              setEventType("edit");
              handleShowOptions(id, "status");
            }}
          ></div>
          {isOptPopUp &&
            id === activeIndex &&
            optionType === "status" &&
            eventType === "edit" && (
              <OptionsPopUp
                options={statusOptions}
                className="absolute top-12 left-1/2 translate-x-12 py-3 px-[14px] gap-3 z-50"
                event={eventType}
              />
            )}
        </>
      )}
    </div>
  );
};

export default TaskCard;
