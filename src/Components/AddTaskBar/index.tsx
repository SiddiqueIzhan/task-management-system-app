import { IoMdAdd } from "react-icons/io";
import { LuCalendarRange } from "react-icons/lu";
import styles from "../CardContainer/CardContainer.module.scss";
import { FaArrowTurnDown } from "react-icons/fa6";
import { useState } from "react";
import { useAppContext } from "../../Context/appContext";
import { cardItemType } from "../../Utils/types";

interface addTaskBarProps {
  cardItem: cardItemType;
}

const AddTaskBar = ({ cardItem }: addTaskBarProps) => {
  const [showAddTaskBar, setShowAddTaskbar] = useState(false);
  const { View } = useAppContext();
  return (
    <>
      {cardItem.status === "TO-DO" && View === "List" && (
        <>
          <div className={styles.addTaskItem}>
            <div className={styles.taskColumn}>
              <span
                className="flex items-center"
                onClick={() => setShowAddTaskbar(!showAddTaskBar)}
              >
                <IoMdAdd className="text-[#7B1984] mr-1" />
                ADD TASK
              </span>
            </div>
          </div>
          {showAddTaskBar && (
            <div className={styles.addTaskItem}>
              <div className={styles.taskColumn}>
                <span>Task Title</span>
              </div>
              <div className={styles.taskColumn}>
                <span>
                  <LuCalendarRange />
                  Add date
                </span>
              </div>
              <div className={styles.taskColumn}>
                <span>
                  <IoMdAdd />
                </span>
              </div>
              <div className={styles.taskColumn}>
                <span>
                  <IoMdAdd />
                </span>
              </div>
              <div className="block ml-[77px]">
                <div className="flex items-center gap-[10px]">
                  <span className="w-[84px] px-3 py-1 rounded-[60px] bg-[#7B1984] text-white text-center font-bold flex items-center gap-2">
                    ADD
                    <FaArrowTurnDown className="text-[#FFFFFFCC] rotate-90 inline" />
                  </span>
                  <span className="w-[84px] px-3 py-1 rounded-[60px] bg-transparent text-black text-center font-bold">
                    CANCEL
                  </span>
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
