import { User } from "firebase/auth";
import Header from "../Components/Header";
import CardContainer from "../Components/CardContainer";
import { cardDetails, listColumns } from "../Components/data";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../Context/appContext";
import { FaCaretUp } from "react-icons/fa";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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
    setActiveCard,
    setActiveStatus,
  } = useAppContext();

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveStatus(event.active.data.current.id);
    }
    setActiveCard(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const getTaskPos = (id: string): number =>
      taskData.findIndex((item) => item.id === id);
    const originalPos = getTaskPos(String(active.id));
    const targetPos = getTaskPos(String(over.id));
    setTaskData(arrayMove(taskData, originalPos, targetPos));

    if (event.active.data.current?.type === "Column") {
      const getTaskPos = (id: string): number =>
        cardDetails.findIndex((item) => item.status === id);
      const originalPos = getTaskPos(String(active.id));
      const targetPos = getTaskPos(String(over.id));
      setTaskData(arrayMove(taskData, originalPos, targetPos));
    }
  };

  return (
    <div className="page">
      <Header user={user} />
      <div className="w-full min-h-[65vh] flex flex-col mt-20 md:mt-[34px]">
        {searchItem && !taskData.length ? (
          <div className="w-[430px] m-auto flex flex-col items-center">
            <img src="./Images/SearchNotFound.svg" alt="emptyholder" />
            <span className="font-bold text-[#2F2F2F] text-2xl text-center">
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
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCorners}
            >
              <div
                className={`flex gap-5 md:gap-8 ${
                  !listView ? "flex-row" : "flex-col"
                }`}
              >
                {cardDetails.map((cardItem, cardIndex) => (
                  <CardContainer
                    cardItem={cardItem}
                    key={cardIndex}
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
