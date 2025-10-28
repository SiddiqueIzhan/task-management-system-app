import React, { useMemo } from "react";
import styles from "../FormPopUp/FormPopUp.module.scss";
import {
  RiBold,
  RiListOrdered2,
  RiListUnordered,
  RiStrikethrough,
} from "react-icons/ri";
import { TbItalic } from "react-icons/tb";
import { tasksDataType } from "../../Utils/types";
import { FormikErrors, FormikTouched } from "formik";
import { useAppContext } from "../../Context/appContext";
import { LuCalendarRange } from "react-icons/lu";
import OptionsPopUp from "../OptionPopUp/optionsPopUp";
import { FaAngleDown } from "react-icons/fa6";
import { statusOptions } from "../data";

interface FormSectionProps {
  values: tasksDataType;
  touched: FormikTouched<tasksDataType>;
  errors: FormikErrors<tasksDataType>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

const FormSection = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
}: FormSectionProps) => {
  const {
    attachments,
    setAttachments,
    isFormPopUp,
    isOptPopUp,
    optionType,
    eventType,
    setEventType,
    handleShowOptions,
  } = useAppContext();

  const popUpType = useMemo(() => {
    if (isFormPopUp === "add") return "add";
    else if (isFormPopUp === "edit") return "edit";
    else return null;
  }, [isFormPopUp]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const filesArray = Array.from(event.target.files);

    // Map files to objects with id and preview
    const newAttachments = filesArray.map((file) => ({
      id: Date.now() + Math.random().toString(), // Unique ID
      file,
      preview: URL.createObjectURL(file), // Preview URL
    }));

    setAttachments((prev) => [...prev, ...newAttachments]); // Add to state
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  };

  return (
    <div
      className={`${styles.formSection} ${
        isFormPopUp === "add" ? "form-add" : "form-edit"
      }`}
    >
      <div
        className={`${styles.inputSection} ${
          errors.title && touched.title && `${styles.error}`
        }`}
      >
        <input
          type="text"
          placeholder="Task title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </div>
      {errors.title && touched.title && (
        <p className="text-[10px] text-red-600">{errors.title}</p>
      )}
      <div
        className={`${styles.inputSection} ${
          errors.description && touched.description && `${styles.error}`
        }`}
      >
        <div className={styles.top}>
          <textarea
            name="description"
            id="description"
            placeholder={`Description`}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          <div className={styles.bottom}>
            <div className={styles.textEditOptions}>
              <RiBold />
              <TbItalic />
              <RiStrikethrough />
              <hr />
              <RiListOrdered2 />
              <RiListUnordered />
            </div>
            <span>0/300 characters</span>
          </div>
        </div>
      </div>
      {errors.description && touched.description && (
        <p className="text-[10px] text-red-600">{errors.description}</p>
      )}
      <div className={styles.requiredFields}>
        <div className={styles.subSection}>
          <label>Task Category*</label>
          <div className={styles.categoryOptions}>
            <span
              className={`${
                values.category === "Work" ? styles.activeCategory : ""
              }`}
              onClick={() =>
                handleChange({
                  target: { name: "category", value: "Work" },
                })
              }
            >
              Work
            </span>
            <span
              className={`${
                values.category === "Personal" ? styles.activeCategory : ""
              }`}
              onClick={() =>
                handleChange({
                  target: { name: "category", value: "Personal" },
                })
              }
            >
              Personal
            </span>
          </div>
          {errors.category && touched.category && (
            <p className="text-[10px] text-red-600">{errors.category}</p>
          )}
        </div>

        <div className={styles.subSection}>
          <label>Due on*</label>
          <div
            className={`${styles.inputSection} ${
              errors.due_date && touched.due_date && `${styles.error}`
            }`}
          >
            <input
              type="text"
              name="due_date"
              className=""
              placeholder="dd-mm-yyyy"
              value={values.due_date}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              readOnly
            />
            <LuCalendarRange
              onClick={() => {
                setEventType(popUpType);
                handleShowOptions("0", "calendar");
              }}
            />
            {isOptPopUp &&
              optionType === "calendar" &&
              (eventType === "add" || eventType === "edit") && (
                <OptionsPopUp event={eventType} />
              )}
          </div>
          {errors.due_date && touched.due_date && (
            <p className="text-[10px] text-red-600">{errors.due_date}</p>
          )}
        </div>
        <div className={styles.subSection}>
          <label>Task Status*</label>
          <div
            className={`${styles.inputSection} ${
              errors.status && touched.status && `${styles.error}`
            }`}
          >
            <input
              type="text"
              name="status"
              className=""
              placeholder="Select Status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="off"
              readOnly
            />
            <FaAngleDown
              className={
                isOptPopUp ? "rotate-180 duration-500" : "duration-500"
              }
              onClick={() => {
                setEventType(popUpType);
                handleShowOptions("0", "status");
              }}
            />
            {isOptPopUp &&
              optionType === "status" &&
              (eventType === "add" || eventType === "edit") && (
                <OptionsPopUp
                  options={statusOptions}
                  className={"absolute -top-28 md:top-10 right-0 gap-[13px]"}
                  event={eventType}
                />
              )}
          </div>
          {errors.status && touched.status && (
            <p className="text-[10px] text-red-600">{errors.status}</p>
          )}
        </div>
      </div>
      <div className={styles.attachmentSection}>
        <label>Attachment</label>
        <div className={styles.inputSection}>
          <label htmlFor="file-input" className={styles.message}>
            <span>Drop your files here or </span>
            <span className="text-blue-500 cursor-pointer">Upload</span>
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <div className="image-preview-grid mt-4 flex flex-wrap gap-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative">
              <img
                src={attachment.preview}
                alt="attachment preview"
                className="w-[150px] h-[150px] rounded-[8px] object-cover border border-gray-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveAttachment(attachment.id)}
                className="absolute -top-1 -right-1 border border-[#00000026] bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormSection;
