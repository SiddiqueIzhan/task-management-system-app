import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  title: Yup.string().min(2).max(50).required("Title is required"),
  description: Yup.string().min(7).max(300),
  due_date: Yup.date().required("Due date is required"),
  category: Yup.string().required("Category is required"),
  status: Yup.string().required("Status is required"),
});
