import { useEffect } from "react";
import { useAppContext } from "../../Context/appContext";
import styles from "../FormPopUp/FormPopUp.module.scss";

const TaskLogSection = () => {
  const { eventLog, getTaskLogs } = useAppContext();

  useEffect(() => {
    getTaskLogs();
  }, []);

  return (
    <div className={styles.activitySection}>
      <div className={styles.header}>
        <h1>Activity</h1>
      </div>
      {eventLog.length === 0 && (
        <p className="text-2xl text-gray-500 text-center m-auto">
          No activity yet
        </p>
      )}
      {eventLog.map((elem, index) => {
        return (
          <div key={index} className={styles.activity}>
            <span>{elem.activity}</span>
            <span>{elem.timeStamp}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TaskLogSection;
