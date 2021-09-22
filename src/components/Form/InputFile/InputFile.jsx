import styles from "./InputFile.module.scss";

import { useFormContext } from "react-hook-form";

export function InputFile({ label, name, onChange = (e) => {} }) {
  const { setValue } = useFormContext();

  return (
    <div>
      <label className={`form-label ${styles.label}`} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type="file"
        accept="image/*"
        className={`form-control`}
        onChange={(e) => {
          setValue(name, e.target.files[0]);
          onChange(e);
        }}
      />
    </div>
  );
}
