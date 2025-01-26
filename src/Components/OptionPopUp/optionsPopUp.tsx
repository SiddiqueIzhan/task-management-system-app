import { useAppContext } from "../../Context/appContext";
import { optionsType } from "../../Utils/types";
import FormPopUp from "../FormPopUp";
import Calendar from "react-calendar";

interface OptionsPopUpProps {
  options?: optionsType[];
  className?: string;
  rowIndex?: number;
}

const OptionsPopUp: React.FC<OptionsPopUpProps> = ({ options, className }) => {
  const {
    popupRef,
    handleDeleteTask,
    activeIndex,
    optionType,
    onChangeDate,
    dateValue,
    isFormPopUp,
    setFormPopUp,
    setCategoryItem,
    handleFindTask,
    selectedValues,
  } = useAppContext();

  const handleTaskOptions = (opt: string) => {
    if (opt === "Edit") {
      setFormPopUp("edit");
      handleFindTask(activeIndex as string);
    } else if (opt === "Delete")
      handleDeleteTask(selectedValues, activeIndex as string);
    else if (opt === "WORK" || opt === "PERSONAL") {
      setCategoryItem(opt);
    } else if (
      opt === "TO-DO" ||
      opt === "IN-PROGRESS" ||
      opt === "COMPLETED"
    ) {
      handleFindTask(activeIndex as string, opt); // Wait for the task to be found
    }
  };

  return (
    <div
      className={`bg-[#FFF9F9] p-3 rounded-xl border border-[#7B198426] shadow-sm absolute z-10 max-w-80 flex flex-col font-semibold whitespace-nowrap ${className} 
      `}
      ref={popupRef}
    >
      {optionType === "calendar" ? (
        <Calendar onChange={onChangeDate} value={dateValue} />
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
          {isFormPopUp === "edit" && (
            <FormPopUp setFormPopUp={setFormPopUp} popupRef={popupRef} />
          )}
        </>
      )}
    </div>
  );
};

export default OptionsPopUp;
