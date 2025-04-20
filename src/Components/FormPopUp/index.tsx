import { IoMdClose } from "react-icons/io";
import styles from "./FormPopUp.module.scss";
import { useFormik } from "formik";
import { SectionData } from "../data";
import { ValidationSchema } from "../../schemas";
import { EventType, tasksDataType } from "../../Utils/types";
import { RefObject, useEffect, useState } from "react";
import { useAppContext } from "../../Context/appContext";
import Tabs from "../Tabs";
import FormSection from "../FormSection";
import TaskLogSection from "../TaskLogSection";

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
    setOptPopUp,
    clearTaskLog,
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
      setOptPopUp(false);
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

  const [showForm, setShowForm] = useState(true);

  const getStyleClass = () => {
    if (isFormPopUp === "add") {
      return "h-4/5 md:w-[64vw] md:h-[58vh] lg:w-1/2 lg:h-[80vh] xl:w-1/2 xl:h-5/6";
    } else if (isFormPopUp === "edit") {
      return "h-[90vh] md:w-[75vw] md:h-[70vh] lg:w-3/4 lg:h-[70vh] xl:w-3/5 xl:h-3/4";
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
            {isFormPopUp === "edit" && !showForm && (
              <span
                className="w-[90px] h-[30px] bg-[#7B1984] px-2 py-[6.5px] rounded-[60px] item-center gap-1 text-white text-xs justify-center"
                onClick={clearTaskLog}
              >
                CLEAR
              </span>
            )}
            <h1>{isFormPopUp === "add" && "Create Task"}</h1>

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
              data={SectionData}
              activeTab={showForm}
              setActiveTab={setShowForm}
              isPopUp={true}
              showIcon={false}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="mobile-view">
              <div className="flex flex-col md:flex-row overflow-scroll">
                {showForm ? (
                  <FormSection
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                ) : (
                  <>{isFormPopUp === "edit" && <TaskLogSection />}</>
                )}
              </div>
            </div>
            <div className="desktop-view">
              <div
                className={isFormPopUp === "add" ? "w-full h-full" : `w-7/12`}
              >
                <FormSection
                  values={values}
                  touched={touched}
                  errors={errors}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>

              {isFormPopUp === "edit" && (
                <div className="w-5/12">
                  <TaskLogSection />
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
