import { ChangeEvent } from "react";

type Props = {
  label: string;
  name?: string;
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inverted?: boolean;
  required?: boolean;
};

export default function CheckboxInput({
  label,
  name,
  id,
  checked,
  defaultChecked,
  value,
  onChange,
  className,
  inverted,
  required,
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        className={`h-4 w-4 accent-primary ${inverted ? "order-2" : ""}`}
        value={value}
        onChange={onChange}
        required={required}
      />
      <label className={`${inverted ? "order-1" : ""}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
