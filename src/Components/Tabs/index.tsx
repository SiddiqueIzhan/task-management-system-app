import { IoList } from "react-icons/io5";
import styles from "./Tabs.module.scss";
import { MdDeveloperBoard } from "react-icons/md";

interface TabsProps {
  data: string[];
  activeTab: boolean;
  setActiveTab: (activeTab: boolean) => void;
  isPopUp: boolean;
  showIcon: boolean;
}

const Tabs = ({
  data,
  activeTab,
  setActiveTab,
  isPopUp,
  showIcon,
}: TabsProps) => {
  return (
    <div
      className={`${styles.toggleContainer} ${isPopUp && styles.togglePopUp}`}
    >
      <div
        className={`${styles.toggleOption} ${activeTab && styles.active} `}
        onClick={() => setActiveTab(true)}
      >
        {showIcon && (
          <span className={styles.icon}>
            <IoList />
          </span>
        )}
        <span className={styles.type}>{data[0]}</span>
      </div>
      <div
        className={`${styles.toggleOption} ${!activeTab && styles.active} `}
        onClick={() => setActiveTab(false)}
      >
        {showIcon && (
          <span className={styles.icon}>
            <MdDeveloperBoard />
          </span>
        )}
        <span className={styles.type}>{data[1]}</span>
      </div>
    </div>
  );
};

export default Tabs;
