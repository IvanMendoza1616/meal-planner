import { ChangeEvent, RefObject } from "react";

type Props = {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  required?: boolean;
};

export default function TextInput({
  label,
  placeholder,
  name,
  id,
  className,
  value,
  defaultValue,
  onChange,
  inputRef,
  required,
}: Props) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        type="text"
        name={name}
        id={id}
        className="w-full rounded-md border px-3 py-2 focus:outline-primary"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={inputRef}
        required={required}
      />
    </div>
  );
}
