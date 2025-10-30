import { useAppContext } from "../../Context/appContext";
import { EventType, optionsType } from "../../Utils/types";
import CalendarComp from "../CalendarComp";

interface OptionsPopUpProps {
  options?: optionsType[];
  className?: string;
  rowIndex?: number;
  event?: EventType;
}

const OptionsPopUp: React.FC<OptionsPopUpProps> = ({
  options,
  className,
  event,
}) => {
  const {
    popupRef,
    handleDeleteTask,
    activeIndex,
    optionType,
    onChangeDateFilter,
    dateValueFilter,
    setFormPopUp,
    setCategoryItem,
    handleFindTask,
    selectedValues,
    handleAddTask,
    onChangeDateAdd,
    dateValueAdd,
  } = useAppContext();

  function capitalize(word: string): string {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const handleTaskOptions = (opt: string) => {
    if (opt === "Edit" && event === "task") {
      setFormPopUp("edit");
      handleFindTask(activeIndex as string);
    } else if (opt === "Delete" && event === "task")
      handleDeleteTask(selectedValues, activeIndex as string);
    else if (opt === "WORK" || opt === "PERSONAL") {
      if (event === "filter") {
        setCategoryItem(opt);
      } else if (event === "add") {
        handleAddTask("category", capitalize(opt));
      }
    } else if (
      opt === "TO-DO" ||
      opt === "IN-PROGRESS" ||
      opt === "COMPLETED"
    ) {
      if (event === "edit" || event === "add") {
        handleAddTask("status", opt);
      }
    }
  };

  return (
    <div
      className={`bg-[#FFF9F9] p-3 rounded-xl border border-[#7B198426] shadow-sm absolute z-10 max-w-80 flex flex-col font-semibold whitespace-nowrap ${className} 
      `}
      ref={popupRef}
    >
      {optionType === "calendar" ? (
        <>
          {event === "filter" && (
            <CalendarComp
              dateValue={dateValueFilter}
              onChangeDate={onChangeDateFilter}
            />
          )}
          {(event === "add" || event === "edit") && (
            <CalendarComp
              dateValue={dateValueAdd}
              onChangeDate={onChangeDateAdd}
            />
          )}
        </>
      ) : (
        <>
          {options?.map((option, index) => {
            const IconComponent = option.icon; // Use the icon component
            return (
              <span
                key={index}
                className={
                  option.opt === "Delete"
                    ? "text-red-500"
                    : " hover:cursor-pointer"
                }
                style={{ background: "transperant" }}
                onClick={() => handleTaskOptions(option.opt)}
              >
                {IconComponent && <IconComponent className="inline mr-2" />}

                {option.opt}
              </span>
            );
          })}
        </>
      )}
    </div>
  );
};

export default OptionsPopUp;
