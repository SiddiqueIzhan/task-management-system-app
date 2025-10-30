import React from "react";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { listColumns, taskOptions } from "../data";
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
          {listColumns.map((column: listColumnsType) => (
            <React.Fragment key={column.dataField}>
              <span
                className={`${styles.taskColumn} ${
                  !listView ? styles.boardColumn : ""
                }`}
              >
                <span className={styles.columnText}>
                  {item[column.dataField]}
                </span>
              </span>
            </React.Fragment>
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
    </div>
  );
};

export default TaskCard;
