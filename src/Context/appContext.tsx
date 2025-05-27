import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  eventLogType,
  EventType,
  filterType,
  OptionType,
  tasksDataType,
  Value,
} from "../Utils/types";
import { db } from "../Config/firebase";
import {
  child,
  get,
  off,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../Pages/login";

interface contextProps {
  taskData: tasksDataType[];
  setTaskData: React.Dispatch<React.SetStateAction<tasksDataType[]>>;
  listView: boolean;
  setListView: (view: boolean) => void;
  getTaskData: () => void;
  handleAddUpdateTask: (task: tasksDataType) => void;
  handleDeleteTask: (selectedValues: string[], taskId: string) => void;
  isFormPopUp: EventType;
  setFormPopUp: (FormPopUp: EventType) => void;
  isOptPopUp: boolean;
  setOptPopUp: (OptPopUp: boolean) => void;
  popupRef: RefObject<HTMLDivElement>;
  activeIndex: string | null;
  handleActiveIndex: (index: string) => void;
  optionType: OptionType;
  setOptionType: (optionType: OptionType) => void;
  handleShowOptions: (index: string, optionType: OptionType) => void;
  dateValueFilter: Value;
  onChangeDateFilter: React.Dispatch<React.SetStateAction<Value>>;
  dateValueAdd: Value;
  onChangeDateAdd: React.Dispatch<React.SetStateAction<Value>>;
  searchItem: string;
  setSearchItem: (searchItem: string) => void;
  categoryItem: filterType;
  setCategoryItem: React.Dispatch<React.SetStateAction<filterType>>;
  editingTask: tasksDataType | null;
  setEditingTask: React.Dispatch<React.SetStateAction<tasksDataType | null>>;
  handleFindTask: (taskId: string, newStatus?: string) => void;
  sortDates: (order: "asc" | "desc") => void;
  eventLog: eventLogType[];
  setEventLog: React.Dispatch<React.SetStateAction<eventLogType[]>>;
  selectedValues: string[];
  handleCheckboxChange: (value: string, isChecked: boolean) => void;
  getTaskLogs: () => () => void;
  clearTaskLog: () => Promise<void>;
  attachments: {
    id: string;
    file: File;
    preview: string;
  }[];
  setAttachments: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        file: File;
        preview: string;
      }[]
    >
  >;
  handleUpdateStatus: (newStatus: string, taskId?: string) => Promise<void>;
  eventType: EventType;
  setEventType: (eventType: EventType) => void;
  addingTask: tasksDataType | null;
  setAddingTask: React.Dispatch<React.SetStateAction<tasksDataType | null>>;
  handleAddTask: (key: string, value: string) => void;
  user: User | null;
}

const appContext = createContext<contextProps | undefined>(undefined);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [taskData, setTaskData] = useState<tasksDataType[]>([]);
  const [listView, setListView] = useState<boolean>(true);
  const [isFormPopUp, setFormPopUp] = useState<EventType>(null);
  const [isOptPopUp, setOptPopUp] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [optionType, setOptionType] = useState<OptionType>(null);
  const [dateValueFilter, onChangeDateFilter] = useState<Value>(null);
  const [dateValueAdd, onChangeDateAdd] = useState<Value>(null);
  const [searchItem, setSearchItem] = useState("");
  const [categoryItem, setCategoryItem] = useState<filterType>(null);
  const [editingTask, setEditingTask] = useState<tasksDataType | null>(null);
  const [eventLog, setEventLog] = useState<eventLogType[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<
    { id: string; file: File; preview: string }[]
  >([]);
  const [eventType, setEventType] = useState<EventType>(null);
  const [addingTask, setAddingTask] = useState<tasksDataType | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const sortDates = (order: "asc" | "desc") => {
    const dateArray = taskData.map((task) => task.due_date);
    const sortedDateArray = dateArray.sort((a, b) => {
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTaskData(
      taskData.map((task, index) => ({
        ...task,
        due_date: sortedDateArray[index],
      }))
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && popupRef.current.contains(event.target as Node)) {
        return;
      }

      setFormPopUp(null);
      setOptPopUp(false);
      setOptionType(null);
      setEditingTask(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  useEffect(() => {
    onAuthStateChanged(auth, (userD) => {
      if (userD) {
        setUser(userD);
      } else setUser(null);
    });
  }, []);

  const filterTasks = (data: tasksDataType[]) => {
    return data?.filter((item) => {
      const matchesSearch = searchItem
        ? item.title?.toLowerCase().includes(searchItem.toLowerCase())
        : true;

      const matchesCategory = categoryItem
        ? item.category?.toLowerCase() === categoryItem.toLowerCase()
        : true;

      const matchesDate = dateValueFilter
        ? item.due_date === format(dateValueFilter.toString(), "yyyy-MM-dd")
        : true;

      return matchesSearch && matchesCategory && matchesDate;
    });
  };

  const getTaskData = () => {
    const dbRef = child(ref(db), `/main/${user?.providerData[0].uid}/tasks`);

    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray: tasksDataType[] = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          // Apply filters
          const filteredData = filterTasks(dataArray);
          setTaskData(filteredData);
        }
      },
      (error) => console.error("Error fetching tasks:", error)
    );

    return () => off(dbRef); // Cleanup the event listener
  };

  const getTaskLogs = () => {
    const logsRef = child(ref(db), `/main/${user?.providerData[0].uid}/tasks/logs`);

    onValue(
      logsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert the logs object into an array
          const logsArray = Object.keys(data).map((key) => ({
            id: key, // Firebase unique key for each log
            ...data[key],
          }));

          // Optional: Sort logs by timestamp (if needed)
          logsArray.sort(
            (a, b) =>
              new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
          );

          // Set the logs to state or display them
          setEventLog(logsArray);
        }
      },
      (error) => console.error("Error fetching task logs:", error)
    );

    return () => off(logsRef); // Cleanup the event listener
  };

  const clearTaskLog = async () => {
    try {
      const logsRef = ref(db, `/main/${user?.providerData[0].uid}/tasks/logs`); // Path to task logs in Firebase

      // Remove all data in the logs path
      await remove(logsRef);
      setEventLog([]); // Clear local state
      toast.success("Task Log Cleared");
    } catch (error) {
      console.error("Error clearing task logs:", error);
      toast.error("Failed to clear Task Log");
    }
  };

  const formatTimeStamp = (isoString: string): string => {
    const date = new Date(isoString); // Parse the ISO string to a Date object

    const options: Intl.DateTimeFormatOptions = {
      month: "short", // "short" is a valid option (e.g., "Dec")
      day: "numeric", // Numeric day of the month
      hour: "numeric", // Hour in 12-hour format
      minute: "2-digit", // Two-digit minute format
      hour12: true, // Use 12-hour format (AM/PM)
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Add "at" between date and time
    return formattedDate.replace(",", " at");
  };

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      // Add the value to the selectedValues array
      setSelectedValues((prev) => [...prev, value]);
    } else {
      // Remove the value from the selectedValues array
      setSelectedValues((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleAddUpdateTask = async (newTask: tasksDataType) => {
    try {
      // Validate the new task to ensure no undefined values
      if (!newTask || Object.values(newTask).some((val) => val === undefined)) {
        throw new Error("Task contains undefined values.");
      }

      const dbRef = ref(db, `/main/${user?.providerData[0].uid}/tasks`);
      const logRef = ref(db, `/main/${user?.providerData[0].uid}/tasks/logs`);
      const snapshot = await get(dbRef);
      const existingData = snapshot.val() || {}; // Fetch existing tasks (default to an empty object)

      if (editingTask) {
        // Update existing task
        const updatedData = {
          ...existingData,
          [editingTask.id]: newTask,
        };

        setEditingTask(null);

        await update(dbRef, updatedData);

        // Add log entry
        const newLogEntry = {
          activity: `You edited ${editingTask.title} details`,
          timeStamp: formatTimeStamp(new Date().toISOString()),
        };

        await push(logRef, newLogEntry); // Add log to Firebase logs array

        setEventLog((pre) => [...pre, newLogEntry]);
        toast.success("Task edited successfully");
      } else {
        // Convert the object to an array if it exists
        const cleanExistingData = Object.keys(existingData).map((key) => ({
          id: key,
          ...existingData[key],
        }));

        // Create a new task object with a unique ID
        const newTaskWithId = { ...newTask, id: Date.now().toString() };

        // Add the new task to the cleaned data
        const updatedData = [...cleanExistingData, newTaskWithId];

        // Convert the updated data back to an object for Firebase
        const dataToSave = updatedData.reduce((acc, task) => {
          acc[task.id] = task;
          return acc;
        }, {});

        // Save the updated tasks back to Firebase
        await update(ref(db, `/main/${user?.providerData[0].uid}`), { tasks: dataToSave });

        // Add log entry
        const newLogEntry = {
          activity: `You created ${newTask.title} task`,
          timeStamp: formatTimeStamp(new Date().toISOString()),
        };

        await push(logRef, newLogEntry); // Add log to Firebase logs array

        setEventLog((pre) => [...pre, newLogEntry]);
        toast.success("Task Added Successfully");
      }

      // Clear the popup and show success message
      setFormPopUp(null);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleUpdateStatus = async (newStatus: string, taskId?: string) => {
    // Validation for listView and selectedValues
    if (listView && selectedValues.length === 0 && !taskId) {
      toast.error("No tasks selected for updating.");
      return;
    }
    if (!listView && !taskId) {
      toast.error("Task ID is required to update the status.");
      return;
    }

    try {
      const dbRef = ref(db, `/main/${user?.providerData[0].uid}/tasks`);
      const logRef = ref(db, `/main/${user?.providerData[0].uid}/tasks/logs`);
      const snapshot = await get(dbRef);
      const existingData = snapshot.val();

      if (existingData) {
        // Prepare updatedData and logs
        const updatedData = { ...existingData };
        const logs: { activity: string; timeStamp: string }[] = [];

        if (listView && selectedValues.length > 0) {
          // Update multiple tasks (list view and selectedValues)
          selectedValues.forEach((taskId) => {
            if (updatedData[taskId]) {
              const oldStatus = updatedData[taskId].status;
              updatedData[taskId].status = newStatus;

              logs.push({
                activity: `You changed the status of task "${updatedData[taskId].title}" from "${oldStatus}" to "${newStatus}"`,
                timeStamp: formatTimeStamp(new Date().toISOString()),
              });
            }
          });
          setSelectedValues([]); // Clear selected values
        } else if (taskId) {
          // Update a single task (either listView=false or fallback)
          if (updatedData[taskId]) {
            const oldStatus = updatedData[taskId].status;
            updatedData[taskId].status = newStatus;

            logs.push({
              activity: `You changed the status of task "${updatedData[taskId].title}" from "${oldStatus}" to "${newStatus}"`,
              timeStamp: formatTimeStamp(new Date().toISOString()),
            });
          } else {
            toast.error(`Task with ID "${taskId}" not found.`);
            return;
          }
        }
        // Update the database
        await update(dbRef, updatedData);

        // Push logs to Firebase
        for (const log of logs) {
          await push(logRef, log);
        }

        // Update local state
        setEventLog((prev) => [...prev, ...logs]);

        toast.success("Task status updated successfully!");
      } else {
        toast.error("No tasks found in the database.");
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleActiveIndex = (index: string) => {
    if (activeIndex === index) setActiveIndex(null);
    else setActiveIndex(index);
  };

  const handleShowOptions = (index: string, type: OptionType) => {
    // Toggle logic to close if already active
    if (isOptPopUp && activeIndex === index && optionType === type) {
      setOptPopUp(false); // Close the popup
      setActiveIndex(null);
      setOptionType(null); // Reset type
    } else {
      setOptPopUp(true); // Open the popup
      setActiveIndex(index);
      setOptionType(type);
    }
  };

  const handleFindTask = (taskId: string, newStatus?: string) => {
    const task = taskData.find((item: tasksDataType) => item.id === taskId);
    if (task) {
      setEditingTask(task);
    }
    if (newStatus) {
      handleUpdateStatus(newStatus);
    }
  };

  const handleDeleteTask = async (selectedValues: string[], taskId: string) => {
    if (listView && selectedValues.length === 0 && !taskId) {
      toast.error("No tasks selected for deletion.");
      return;
    }

    try {
      const dbRef = ref(db, `/main/${user?.providerData[0].uid}/tasks`);
      const logRef = ref(db, `/main/${user?.providerData[0].uid}/tasks/logs`);

      const snapshot = await get(dbRef);
      const existingData = snapshot.val();

      if (!existingData) {
        toast.error("No tasks found in the database.");
        return;
      }

      const logs: { activity: string; timeStamp: string }[] = [];
      const deletedTasks: string[] = [];
      const failedTasks: string[] = [];

      // Iterate over selected values to delete
      if (listView && selectedValues.length > 0) {
        for (const taskId of selectedValues) {
          if (existingData[taskId]) {
            const title = existingData[taskId].title;
            const taskRef = ref(db, `/main/${user?.providerData[0].uid}/tasks/${taskId}`);

            try {
              await remove(taskRef);
              deletedTasks.push(title);

              // Add deletion log
              logs.push({
                activity: `You deleted the task "${title}"`,
                timeStamp: formatTimeStamp(new Date().toISOString()),
              });
            } catch (error) {
              failedTasks.push(title);
              console.error(`Error deleting task "${title}":`, error);
            }
          } else {
            failedTasks.push(taskId);
          }
        }
      } else if (taskId) {
        const title = existingData[taskId].title;
        const taskRef = ref(db, `/main/${user?.providerData[0].uid}/tasks/${taskId}`);
        try {
          await remove(taskRef);
          deletedTasks.push(title);
          // Add deletion log
          logs.push({
            activity: `You deleted the task "${title}"`,
            timeStamp: formatTimeStamp(new Date().toISOString()),
          });
        } catch (error) {
          failedTasks.push(title);
          console.error(`Error deleting task "${title}":`, error);
        }
      }

      // Push logs to Firebase
      for (const log of logs) {
        await push(logRef, log);
      }

      // Update the local event log state
      setEventLog((prev) => [...prev, ...logs]);

      // Show toast notifications for results
      if (deletedTasks.length > 0) {
        toast.success(`Deleted tasks: ${deletedTasks.join(", ")}`);
      }
      if (failedTasks.length > 0) {
        toast.error(`Failed to delete: ${failedTasks.join(", ")}`);
      }

      // Reload if all tasks are deleted
      if (deletedTasks.length === taskData.length) {
        window.location.reload();
      }

      setOptPopUp(false);
    } catch (error: any) {
      console.error("Error handling delete operation:", error);
      toast.error("Error handling delete operation.");
    }
  };

  const handleAddTask = (key: string, value: string) => {
    console.log(key, value);
    setAddingTask((prevTask) => {
      // Ensure the state always returns a valid tasksDataType object
      const updatedTask = {
        ...(prevTask || { id: "", status: "" }), // Provide defaults if prevTask is null
        [key]: value, // Update the specified key
      };

      return updatedTask as tasksDataType; // Ensure it matches the tasksDataType interface
    });
  };

  return (
    <appContext.Provider
      value={{
        taskData,
        setTaskData,
        listView,
        setListView,
        getTaskData,

        handleAddUpdateTask,
        isFormPopUp,
        setFormPopUp,
        isOptPopUp,
        setOptPopUp,
        popupRef,
        activeIndex,
        handleActiveIndex,
        handleDeleteTask,
        optionType,
        setOptionType,
        handleShowOptions,
        dateValueFilter,
        onChangeDateFilter,
        searchItem,
        setSearchItem,
        categoryItem,
        setCategoryItem,
        editingTask,
        setEditingTask,
        handleFindTask,
        sortDates,
        eventLog,
        setEventLog,
        selectedValues,
        handleCheckboxChange,
        getTaskLogs,
        clearTaskLog,
        attachments,
        setAttachments,
        handleUpdateStatus,
        eventType,
        setEventType,
        addingTask,
        setAddingTask,
        handleAddTask,
        dateValueAdd,
        onChangeDateAdd,
        user,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useAppContext must be used within a FormProvider");
  }
  return context;
};
