import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(20, "Maximum 30 character"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+/,
      "Password must start with an uppercase letter and contain at least one number"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+/,
      "Password must start with an uppercase letter and contain at least one number"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const verifySchema = Yup.object({
  confirmCode: Yup.string().required("Verification code is required"),
});
