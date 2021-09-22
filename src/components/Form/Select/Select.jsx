import styles from "./Select.module.scss";

import { useFormContext } from "react-hook-form";

export function Select({ label, name, children }) {
  const { register } = useFormContext();

  return (
    <div>
      <label className={`form-label ${styles.label}`} htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        className={`form-select`}
        {...register(name, {})}
      >
        {children}
      </select>
    </div>
  );
}
