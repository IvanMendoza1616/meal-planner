import { ChangeEvent } from "react";

type Props = {
  label?: string;
  placeholder?: string;
  name: string;
  id: string;
  rows: number;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
};
export default function TextAreaInput({
  label,
  placeholder,
  name,
  id,
  rows,
  value,
  defaultValue,
  onChange,
  required,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full resize-none rounded-md border px-3 py-2"
        rows={rows}
        name={name}
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
