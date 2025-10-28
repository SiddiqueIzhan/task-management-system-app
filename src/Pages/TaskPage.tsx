import { User } from "firebase/auth";
import Header from "../Components/Header";
import CardContainer from "../Components/CardContainer";
import { cardDetails, listColumns } from "../Components/data";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../Context/appContext";
import { FaCaretUp } from "react-icons/fa";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { tasksDataType } from "../Utils/types";
import React from "react";

interface userPageProps {
  user: User;
}

export const statusList = cardDetails.map((elem) => elem.status);

const TaskPage: React.FC<userPageProps> = ({ user }) => {
  const {
    searchItem,
    taskData,
    setTaskData,
    sortDates,
    listView,
    handleUpdateStatus,
  } = useAppContext();

  const handleDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const getTaskPos = (tasks: tasksDataType[], id: string): number =>
      tasks.findIndex((item) => item.id === id);

    setTaskData((prevTasks: tasksDataType[]) => {
      const originalPos = getTaskPos(prevTasks, String(active.id));
      const targetPos = getTaskPos(prevTasks, String(over.id));

      // Check if the statuses are different
      if (
        active.data.current?.status !== over.data.current?.status ||
        over.id === "empty-placeholder"
      ) {
        const updatedTasks = [...prevTasks];
        const movedTask = {
          ...updatedTasks[originalPos],
          status: over.data.current?.status,
        };
        handleUpdateStatus(movedTask.status, movedTask.id);
        updatedTasks.splice(originalPos, 1); // Remove the task from its original position
        updatedTasks.splice(targetPos, 0, movedTask); // Insert the task in the new position

        return updatedTasks; // Return the updated tasks array
      }

      return arrayMove(prevTasks, originalPos, targetPos); // Use arrayMove for sorting within the same container
    });
  };

  return (
    <div className="page">
      <Header user={user} />
      <div className="w-full min-h-[65vh] flex flex-col mt-20 md:mt-[34px]">
        {searchItem && !taskData.length ? (
          <div className="md:w-[430px] m-auto flex flex-col items-center w-[230px]">
            <img src="./Images/SearchNotFound.svg" alt="emptyholder" />
            <span className="font-bold text-[#2F2F2F] md:text-2xl text-center text-lg">
              It looks like we can't find any results that match.
            </span>
          </div>
        ) : (
          <>
            {listView && (
              <div className="w-full border-t display-grid p-[10px] ">
                {listColumns.map((column, index) => (
                  <span
                    key={index}
                    className="text-sm font-bold text-[#00000099] flex items-center"
                  >
                    {column.label}
                    {index === 1 && (
                      <span className="flex flex-col">
                        <FaCaretUp
                          className="ml-2 text-[#00000099]"
                          onClick={() => sortDates("asc")}
                        />
                        <FaCaretUp
                          className="ml-2 text-[#00000099] rotate-180"
                          onClick={() => sortDates("desc")}
                        />
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
            <DndContext
              onDragOver={handleDragOver}
              collisionDetection={closestCorners}
            >
              <div
                className={`w-full min-h-[68vh] flex gap-5 md:gap-8 ${
                  !listView ? "flex-row" : "flex-col"
                }`}
              >
                {cardDetails.map((cardItem) => (
                  <CardContainer
                    cardItem={cardItem}
                    key={cardItem.status}
                    tasks={taskData.filter(
                      (task) => task.status === cardItem.status
                    )}
                  />
                ))}
              </div>
            </DndContext>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TaskPage;
