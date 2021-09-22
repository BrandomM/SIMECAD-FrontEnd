import { useFormContext } from "react-hook-form";

export function InputHidden({ name, value }) {
  const { setValue } = useFormContext();
  setValue(name, value);
  return <input type="hidden" />;
}
