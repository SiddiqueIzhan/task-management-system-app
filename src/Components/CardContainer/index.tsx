import React, { useEffect, useMemo, useState } from "react";
import styles from "./CardContainer.module.scss"; // Import the SASS styles
import { FaAngleDown } from "react-icons/fa6";
import { cardItemType, tasksDataType } from "../../Utils/types";
import { useAppContext } from "../../Context/appContext";
import TaskCard from "../TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddTaskBar from "../AddTaskBar";

interface CardContainerProps {
  cardItem: cardItemType;
  tasks: tasksDataType[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cardItem, tasks }) => {
  const [hideList, setHideList] = useState(false);
  const [count, setCount] = useState(0);

  const { getTaskData, searchItem, categoryItem, dateValue, listView } =
    useAppContext();

  useEffect(() => {
    getTaskData();
  }, [searchItem, categoryItem, dateValue]);

  useEffect(() => {
    setCount(tasks.length);
  }, [tasks]);

  const taskIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const getStyleClass = () => {
    if (cardItem.status === "TO-DO") return styles.todo;
    else if (cardItem.status === "IN-PROGRESS") return styles.inProgress;
    else if (cardItem.status === "COMPLETED") return styles.completed;
  };

  return (
    <>
      {searchItem && !count ? (
        <></>
      ) : (
        <div
          className={`${styles.parent} ${hideList && styles.hideCard} ${
            !listView && styles.boardParent
          } ${getStyleClass()}`}
        >
          <div
            className={`${styles.status} ${
              !listView ? styles.boardStatus : styles.listStatus
            }`}
          >
            <span>
              {listView ? `${cardItem.title} (${count})` : cardItem.status}
            </span>
            <FaAngleDown
              className={`${styles.arrow} ${
                hideList ? "rotate-180" : "rotate-0"
              }`}
              onClick={() => setHideList(!hideList)}
            />
          </div>
          <div
            className={`${styles.cardContainer} ${
              !listView
                ? `${styles.board}`
                : `${styles.list} ${hideList ? `${styles.hideList}` : ``}`
            }`}
          >
            <AddTaskBar cardItem={cardItem} />
            {count === 0 ? (
              <span className={styles.noTasks}>
                {cardItem.emptyPlaceHolder}
              </span>
            ) : (
              <SortableContext
                items={taskIds}
                strategy={verticalListSortingStrategy}
              >
                {tasks?.map((item: tasksDataType, rowindex) => {
                  return (
                    <React.Fragment key={rowindex}>
                      <TaskCard id={item.id} item={item} cardItem={cardItem} />
                    </React.Fragment>
                  );
                })}
              </SortableContext>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CardContainer;
