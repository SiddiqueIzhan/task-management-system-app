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
import EmptyPlaceholder from "../EmptyPlaceHolder";
import { useDndMonitor } from "@dnd-kit/core";

interface CardContainerProps {
  cardItem: cardItemType;
  tasks: tasksDataType[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cardItem, tasks }) => {
  const [hideList, setHideList] = useState(false);
  const [count, setCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Monitor drag events to determine if something is being dragged
  useDndMonitor({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDragCancel: () => setIsDragging(false),
  });

  const {
    getTaskData,
    searchItem,
    categoryItem,
    dateValueFilter,
    listView,
    tasksLoading,
  } = useAppContext();

  useEffect(() => {
    getTaskData();
  }, [searchItem, categoryItem, dateValueFilter]);

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
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            {isDragging && tasks.length === 0 ? (
              <EmptyPlaceholder cardItem={cardItem} />
            ) : (
              <div
                className={`${styles.cardContainer} ${
                  !listView
                    ? `${styles.board}`
                    : `${styles.list} ${hideList ? `${styles.hideList}` : ``}`
                }`}
              >
                <AddTaskBar cardItem={cardItem} />
                {tasksLoading && (
                  <div className="w-full h-[160px] absolute flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-500 border-dotted rounded-full animate-spin"></div>
                  </div>
                )}
                {count === 0 && !tasksLoading && !isDragging ? (
                  <span className={styles.noTasks}>
                    {cardItem.emptyPlaceHolder}
                  </span>
                ) : (
                  <>
                    {tasks?.map((item: tasksDataType) => {
                      return (
                        <TaskCard
                          key={item.id}
                          id={item.id}
                          item={item}
                          cardItem={cardItem}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </SortableContext>
        </div>
      )}
    </>
  );
};

export default CardContainer;
