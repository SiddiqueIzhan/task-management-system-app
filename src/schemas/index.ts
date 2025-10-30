import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  title: Yup.string().min(2).max(50).required("Title is required").matches(/^[A-Za-z0-9 ]+$/, "No Special Characters"),
  description: Yup.string().min(7).max(300).matches(/^[A-Za-z0-9,.]+$/, "No Special Characters"),
  due_date: Yup.date().required("Due date is required"),
  category: Yup.string().required("Category is required"),
  status: Yup.string().required("Status is required"),
});
