import { ChangeEvent, ReactNode } from "react";

type Props = {
  label?: string;
  name: string;
  id: string;
  defaultValue?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  required?: boolean;
};

export default function Select({
  label,
  name,
  id,
  defaultValue,
  className,
  onChange,
  children,
  required,
}: Props) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
      )}

      <select
        name={name}
        id={id}
        defaultValue={defaultValue}
        className="rounded-md border px-3 py-2"
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
    </div>
  );
}
