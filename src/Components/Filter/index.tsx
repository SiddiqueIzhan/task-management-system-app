import { FaAngleDown } from "react-icons/fa6";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { categoryOptions } from "../data";
import { useAppContext } from "../../Context/appContext";
import { toast } from "react-toastify";

const FilterOptions = () => {
  const {
    optionType,
    handleShowOptions,
    dateValue,
    categoryItem,
    onChangeDate,
    setCategoryItem,
  } = useAppContext();

  return (
    <div className="w-full flex items-start md:items-center gap-2 md:gap-[10px] flex-col md:flex-row ">
      <span className="text-xs text-[#00000099]">Filter By: </span>
      <div className="item-center gap-[10px] relative">
        <span
          className="w-[90px] h-[30px] px-2 py-[6.5px] rounded-[60px] border border-[#00000033] item-center gap-1 text-[#00000099] text-xs relative"
          onClick={() => handleShowOptions("0", "category")}
        >
          {optionType === "category" && (
            <OptionsPopUp
              options={categoryOptions}
              className={"absolute top-10 right-0 gap-[13px]"}
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
          onClick={() => handleShowOptions("1", "calendar")}
        >
          <span>
            {dateValue ? dateValue.toLocaleString().slice(0, 10) : "Due Date"}
          </span>
          <FaAngleDown
            className={
              optionType === "calendar"
                ? "rotate-180 duration-500"
                : "duration-500"
            }
          />
        </span>
        {optionType === "calendar" && (
          <OptionsPopUp className="absolute top-10" />
        )}
        <span
          className="w-[90px] h-[30px] bg-[#7B1984] px-2 py-[6.5px] rounded-[60px] item-center gap-1 text-white text-xs justify-center"
          onClick={() => {
            onChangeDate(null);
            setCategoryItem(null);
            toast.success("Reset Successful")
          }}
        >
          RESET
        </span>
      </div>
    </div>
  );
};

export default FilterOptions;
