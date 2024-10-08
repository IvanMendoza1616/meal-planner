import { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
};

export default function RadioInputs({
  label,
  name,
  id,
  onChange,
  className,
  required,
}: Props) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className="font-semibold">{label}</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            id={`${id}-yes`}
            value="yes"
            className="h-4 w-4"
            onChange={onChange}
            required={required}
          />
          <label htmlFor={`${id}-yes`}>Yes</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            id={`${id}-no`}
            value="no"
            className="h-4 w-4"
            onChange={onChange}
            required={required}
          />
          <label htmlFor={`${id}-no`}>No</label>
        </div>
      </div>
    </div>
  );
}
