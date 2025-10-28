import { IoMdAdd } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import styles from "../CardContainer/CardContainer.module.scss";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/appContext";
import { cardItemType } from "../../Utils/types";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { categoryOptions, statusOptions } from "../data";
import { format } from "date-fns";

interface addTaskBarProps {
  cardItem: cardItemType;
}

const AddTaskBar = ({ cardItem }: addTaskBarProps) => {
  const [showAddTaskBar, setShowAddTaskbar] = useState(false);
  const {
    listView,
    isOptPopUp,
    setOptPopUp,
    handleShowOptions,
    optionType,
    eventType,
    setEventType,
    addingTask,
    setAddingTask,
    dateValueAdd,
    onChangeDateAdd,
    handleAddTask,
    handleAddUpdateTask,
  } = useAppContext();

  useEffect(() => {
    if (dateValueAdd) {
      handleAddTask("due_date", format(dateValueAdd?.toString(), "yyyy-MM-dd"));
    }
  }, [dateValueAdd]);

  useEffect(() => {
    setOptPopUp(false);
  }, [addingTask]);
  return (
    <>
      {cardItem.status === "TO-DO" && listView && (
        <>
          <div className={styles.addTaskItem}>
            <div className={styles.taskColumn}>
              <span
                className="flex items-center"
                onClick={() => setShowAddTaskbar(true)}
              >
                <IoMdAdd className="text-[#7B1984] mr-1" />
                ADD TASK
              </span>
            </div>
          </div>
          {showAddTaskBar && (
            <div className={styles.addTaskItem}>
              <div className={styles.taskElements}>
                <div className={styles.taskColumn}>
                  <span>
                    <input
                      type="text"
                      placeholder="Task Title"
                      className="bg-transparent"
                      value={addingTask?.title}
                      onChange={(e) => handleAddTask("title", e.target.value)}
                    />
                  </span>
                </div>
                <div className={styles.taskColumn}>
                  <span
                    onClick={() => {
                      setEventType("add");
                      handleShowOptions("0", "calendar");
                    }}
                  >
                    <LuCalendarRange />
                    {dateValueAdd
                      ? dateValueAdd.toLocaleString().split(",")[0]
                      : "Add Date"}
                  </span>
                  {isOptPopUp &&
                    optionType === "calendar" &&
                    eventType === "add" && <OptionsPopUp event={eventType} />}
                </div>
                <div className={styles.taskColumn}>
                  <span
                    onClick={() => {
                      setEventType("add");
                      handleShowOptions("1", "status");
                    }}
                    className={`${styles.add} ${
                      addingTask?.status && styles.added
                    }`}
                  >
                    {addingTask?.status ? addingTask?.status : <IoMdAdd />}
                  </span>
                  {isOptPopUp &&
                    optionType === "status" &&
                    eventType === "add" && (
                      <OptionsPopUp
                        options={statusOptions}
                        className="absolute top-8 left-[30px] py-3 px-[14px] gap-3 z-50"
                        event={"add"}
                      />
                    )}
                </div>
                <div className={styles.taskColumn}>
                  <span
                    onClick={() => {
                      setEventType("add");
                      handleShowOptions("2", "category");
                    }}
                    className={`${styles.add} ${
                      addingTask?.category && styles.added
                    }`}
                  >
                    {addingTask?.category ? addingTask?.category : <IoMdAdd />}
                  </span>
                  {isOptPopUp &&
                    optionType === "category" &&
                    eventType === "add" && (
                      <OptionsPopUp
                        options={categoryOptions}
                        className="absolute top-8 left-[30px]  py-3 px-[14px] gap-3 z-50"
                        event={"add"}
                      />
                    )}
                </div>
                <div className="block ml-[77px]">
                  <div className="flex items-center gap-[10px]">
                    <span
                      className="w-[84px] px-3 py-1 rounded-[60px] bg-[#7B1984] text-white text-center font-bold flex items-center gap-2"
                      onClick={() => {
                        addingTask && handleAddUpdateTask(addingTask);
                        setAddingTask(null); // reset adding task
                        onChangeDateAdd(null);
                        setShowAddTaskbar(false);
                      }}
                    >
                      ADD
                      <FaArrowTurnDown className="text-[#FFFFFFCC] rotate-90 inline" />
                    </span>
                    <span
                      className="w-[84px] px-3 py-1 rounded-[60px] bg-transparent text-black text-center font-bold"
                      onClick={() => {
                        onChangeDateAdd(null);
                        setAddingTask(null); // reset adding task
                        setAddingTask(null);
                        setShowAddTaskbar(false);
                      }}
                    >
                      CANCEL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AddTaskBar;
