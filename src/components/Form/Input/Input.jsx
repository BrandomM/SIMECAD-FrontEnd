import styles from "./Input.module.scss";

import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { InvalidFeedback } from "../InvalidFeedback/InvalidFeedback";

export function Input({
  label,
  name,
  type,
  required,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  isInvalid=false,
  value,
}) {
  const { t } = useTranslation();
  const T = (key) => t("form.errors." + key);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (type === "email") {
    pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    type = "text";
  }

  return (
    <div>
      <label className={`form-label ${styles.label}`} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={`form-control ${errors[name] || isInvalid ? "is-invalid" : ""}`}
        {...register(name, {
          required,
          minLength,
          maxLength,
          min,
          max,
          pattern,
        })}
        defaultValue={value}
      />
      {errors[name]?.type === "required" && InvalidFeedback(T("required"))}
      {errors[name]?.type === "minLength" &&
        InvalidFeedback(`${T("minLength")} ${minLength}`)}
      {errors[name]?.type === "maxLength" &&
        InvalidFeedback(`${T("maxLength")} ${maxLength}`)}
      {errors[name]?.type === "min" && InvalidFeedback(`${T("min")} ${min}`)}
      {errors[name]?.type === "max" && InvalidFeedback(`${T("max")} ${max}`)}
      {errors[name]?.type === "pattern" && InvalidFeedback(T("pattern"))}
    </div>
  );
}
