import { FaAngleDown } from "react-icons/fa6";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { categoryOptions } from "../data";
import { useAppContext } from "../../Context/appContext";
import { toast } from "react-toastify";

const FilterOptions = () => {
  const {
    optionType,
    handleShowOptions,
    dateValueFilter,
    categoryItem,
    onChangeDateFilter,
    setCategoryItem,
    eventType,
    setEventType,
  } = useAppContext();

  return (
    <div className="w-full flex items-start md:items-center gap-2 md:gap-[10px] flex-col md:flex-row ">
      <span className="text-xs text-[#00000099]">Filter By: </span>
      <div className="item-center gap-[10px] relative">
        <span
          className="w-[90px] h-[30px] px-2 py-[6.5px] rounded-[60px] border border-[#00000033] item-center gap-1 text-[#00000099] text-xs relative"
          onClick={() => {
            setEventType("filter");
            handleShowOptions("0", "category");
          }}
        >
          {optionType === "category" && eventType === "filter" && (
            <OptionsPopUp
              options={categoryOptions}
              className={"absolute top-10 right-0 gap-[13px]"}
              event={eventType}
            />
          )}
          <span>{categoryItem ? categoryItem : "Category"}</span>
          <FaAngleDown
            className={
              optionType === "category"
                ? "rotate-180 duration-500"
                : "duration-500"
            }
          />
        </span>
        <span
          className="w-[90px] h-[30px] px-2 py-[6.5px] rounded-[60px] border border-[#00000033] item-center gap-1 text-[#00000099] text-xs"
          onClick={() => {
            setEventType("filter");
            handleShowOptions("1", "calendar");
          }}
        >
          <span>
            {dateValueFilter
              ? dateValueFilter.toLocaleString().split(",")[0]
              : "Due Date"}
          </span>
          <FaAngleDown
            className={
              optionType === "calendar"
                ? "rotate-180 duration-500"
                : "duration-500"
            }
          />
        </span>
        {optionType === "calendar" && eventType === "filter" && (
          <OptionsPopUp className="absolute top-10" event={eventType} />
        )}
        <span
          className="w-[90px] h-[30px] bg-[#7B1984] px-2 py-[6.5px] rounded-[60px] item-center gap-1 text-white text-xs justify-center"
          onClick={() => {
            onChangeDateFilter(null);
            setCategoryItem(null);
            toast.success("Clear Successful");
          }}
        >
          CLEAR
        </span>
      </div>
    </div>
  );
};

export default FilterOptions;
