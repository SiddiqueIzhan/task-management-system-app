import { IoMdClose } from "react-icons/io";
import styles from "./FormPopUp.module.scss";
import { useFormik } from "formik";
import { RiBold } from "react-icons/ri";
import { TbItalic } from "react-icons/tb";
import { RiStrikethrough } from "react-icons/ri";
import { RiListOrdered2 } from "react-icons/ri";
import { RiListUnordered } from "react-icons/ri";
import { togglePopSection } from "../data";
import { ValidationSchema } from "../../schemas";
import { EventType, tasksDataType } from "../../Utils/types";
import { RefObject, useEffect, useState } from "react";
import { useAppContext } from "../../Context/appContext";
import Tabs from "../Tabs";
import { toast } from "react-toastify";

interface FormPopUpProps {
  setFormPopUp: (FormPopUp: EventType) => void;
  popupRef: RefObject<HTMLDivElement>;
}

const FormPopUp: React.FC<FormPopUpProps> = ({ setFormPopUp, popupRef }) => {
  const initialValues: tasksDataType = {
    id: "",
    title: "",
    description: "",
    category: "",
    due_date: "",
    status: "",
  };

  const {
    isFormPopUp,
    editingTask,
    handleAddUpdateTask,
    eventLog,
    setEventLog,
    setOptPopUp,
  } = useAppContext();

  const {
    values,
    setValues,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values, action) => {
      handleAddUpdateTask(values);
      action.resetForm();
    },
  });

  useEffect(() => {
    if (editingTask) {
      setValues({
        id: editingTask.id,
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        due_date: editingTask.due_date,
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  const [showSection, setShowSection] = useState("DETAILS");

  const getStyleClass = () => {
    if (isFormPopUp === "add") {
      return "h-4/5 md:w-1/2 md:h-5/6";
    } else if (isFormPopUp === "edit") {
      return "h-5/6 md:w-3/5 md:h-3/4";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className={"black-overlay"}>
        <div
          className={`${styles.modal} 
          ${getStyleClass()}`}
          ref={popupRef}
        >
          <div className={styles.modalHeader}>
            {isFormPopUp === "add" && <h1>Create Task</h1>}
            {isFormPopUp === "edit" && showSection === "ACTIVITY" && (
              <span
                className="w-[90px] h-[30px] bg-[#7B1984] px-2 py-[6.5px] rounded-[60px] item-center gap-1 text-white text-xs justify-center"
                onClick={() => {
                  setEventLog([]);
                  if (!eventLog) toast.success("Task Log Cleared");
                }}
              >
                CLEAR
              </span>
            )}
            <IoMdClose
              className={styles.closeIcon}
              onClick={() => {
                setFormPopUp(null);
                setOptPopUp(false);
              }}
            />
          </div>
          {isFormPopUp === "edit" && (
            <Tabs
              data={togglePopSection}
              activeTab={showSection}
              setActiveTab={setShowSection}
              isPopUp={true}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row overflow-scroll">
              {showSection === "DETAILS" && (
                <div
                  className={`${styles.formSection} 
                ${"w-full"}
                `}
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
                    />
                  </div>
                  {errors.title && touched.title && (
                    <p className="text-[10px] text-red-600">{errors.title}</p>
                  )}
                  <div
                    className={`${styles.inputSection} ${
                      errors.description &&
                      touched.description &&
                      `${styles.error}`
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
                    <p className="text-[10px] text-red-600">
                      {errors.description}
                    </p>
                  )}
                  <div className={styles.requiredFields}>
                    <div className={styles.subSection}>
                      <label>Task Category*</label>
                      <div className={styles.categoryOptions}>
                        <span
                          className={`${
                            values.category === "Work"
                              ? styles.activeCategory
                              : ""
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
                            values.category === "Personal"
                              ? styles.activeCategory
                              : ""
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
                        <p className="text-[10px] text-red-600">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    <div className={styles.subSection}>
                      <label>Due on*</label>
                      <div
                        className={`${styles.inputSection} ${
                          errors.due_date &&
                          touched.due_date &&
                          `${styles.error}`
                        }`}
                      >
                        <input
                          type="date"
                          name="due_date"
                          className=""
                          value={values.due_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      {errors.due_date && touched.due_date && (
                        <p className="text-[10px] text-red-600">
                          {errors.due_date}
                        </p>
                      )}
                    </div>
                    <div className={styles.subSection}>
                      <label>Task Status*</label>
                      <div
                        className={`${styles.inputSection} ${
                          errors.status && touched.status && `${styles.error}`
                        }`}
                      >
                        <select
                          name="status"
                          className=""
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Choose</option>
                          <option value="TO-DO">TO-DO</option>
                          <option value="IN-PROGRESS">IN-PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </div>
                      {errors.status && touched.status && (
                        <p className="text-[10px] text-red-600">
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={styles.attachmentSection}>
                    <label>Attachment</label>
                    <div className={styles.inputSection}>
                      <label htmlFor="file-input" className={styles.message}>
                        <span>Drop your files here or </span>
                        <span className="text-blue-500 cursor-pointer">
                          Upload
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {isFormPopUp === "edit" && showSection === "ACTIVITY" && (
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
              )}
            </div>
            <div className={styles.buttonSection}>
              <button
                type="button"
                onClick={() => {
                  setFormPopUp(null);
                  setOptPopUp(false);
                }}
              >
                CANCEL
              </button>
              <button type="submit">
                {isFormPopUp === "add" ? "CREATE" : "UPDATE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormPopUp;
