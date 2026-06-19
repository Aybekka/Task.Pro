import * as yup from "yup";

const nameRules = yup
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(50, "Name must be at most 50 characters.")
  .required("Name is required.");

const emailRules = yup
  .string()
  .trim()
  .email("Enter a valid email address.")
  .required("Email is required.");

const passwordRules = yup
  .string()
  .min(8, "Password must be at least 8 characters.")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter.")
  .matches(/[0-9]/, "Must contain at least one number.")
  .required("Password is required.");

export const loginSchema = yup.object({
  email: emailRules,
  password: yup.string().required("Password is required."),
});

export const registerSchema = yup.object({
  name: nameRules,
  email: emailRules,
  password: passwordRules,
});
