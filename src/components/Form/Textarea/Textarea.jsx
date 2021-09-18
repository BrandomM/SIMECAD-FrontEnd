import styles from "./Textarea.module.scss";

import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { InvalidFeedback } from "../InvalidFeedback/InvalidFeedback";

export function Textarea({ label, name, required }) {
  const { t } = useTranslation();
  const T = (key) => t("form.errors." + key);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className={`form-label ${styles.label}`} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        {...register(name, { required })}
      />
      {errors[name]?.type === "required" && InvalidFeedback(T("required"))}
    </div>
  );
}
