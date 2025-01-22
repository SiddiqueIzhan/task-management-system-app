import styles from "./Tabs.module.scss";
import { ToggleDataType } from "../../Utils/types";

interface TabsProps {
  data: ToggleDataType[];
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  isPopUp: boolean;
}

const Tabs = ({ data, activeTab, setActiveTab, isPopUp }: TabsProps) => {
  return (
    <div
      className={`${styles.toggleContainer} ${isPopUp && styles.togglePopUp}`}
    >
      {data.map(({ show, icon }, index) => {
        const IconComponent = icon;
        return (
          <div
            key={index}
            className={`${styles.toggleOption} ${
              show === activeTab ? styles.active : ""
            } `}
            onClick={() => setActiveTab(show)}
          >
            {IconComponent && (
              <span className={styles.icon}>
                <IconComponent />
              </span>
            )}
            <span className={styles.type}>{show}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
