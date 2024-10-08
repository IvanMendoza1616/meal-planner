type Props = {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  rows: number;
  defaultValue?: string;
  required?: boolean;
};
export default function TextAreaInput({
  label,
  placeholder,
  name,
  id,
  rows,
  defaultValue,
  required,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full resize-none rounded-md border px-3 py-2"
        rows={rows}
        name={name}
        id={id}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
}
