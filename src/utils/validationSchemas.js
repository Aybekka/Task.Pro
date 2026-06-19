import * as yup from "yup";

// Ortak Yup yardımcıları burada kalıyor; auth şemaları artık ilgili sayfa klasöründe.
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

export const editProfileSchema = yup.object({
  name: nameRules,
  email: emailRules,
  // Profil düzenlemede şifre alanını boş bırakmaya izin veriyorum (değiştirmek istemeyebilir),
  // ama bir şey yazdıysa yine de güçlü şifre kuralını uyguluyorum
  password: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v))
    .test(
      "optional-strong",
      "Min 8 chars, one uppercase, one number.",
      (val) => {
        if (!val) return true;
        return val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val);
      },
    ),
});

export const boardSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(1)
    .max(100)
    .required("Board name is required."),
  icon: yup.string().required("Please select an icon."),
  background: yup.string().required("Please select a background."),
});

export const columnSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(1)
    .max(80)
    .required("Column title is required."),
});

export const cardSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(1)
    .max(200)
    .required("Card title is required."),
  description: yup.string().trim().max(1000).nullable(),
  priority: yup
    .string()
    .oneOf(["without", "low", "medium", "high"])
    .required("Priority is required."),
  deadline: yup.string().nullable(),
});
