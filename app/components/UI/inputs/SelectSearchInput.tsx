"use client";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

export type Option = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow arbitrary properties
};

type Props = {
  label?: string;
  name: string;
  id: string;
  options: Option[];
  value: Option;
  onChange: (selectedValue: Option) => void;
  inputRef: RefObject<HTMLInputElement>;
  className?: string;
};

export default function SelectSearchInput({
  label,
  name,
  id,
  options,
  value,
  onChange,
  inputRef,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value.name);

  const wrapperRef = useRef<HTMLDivElement>(null);

  //Reset state if value is empty
  useEffect(() => {
    if (value.name === "") setSearch("");
  }, [value.name]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    inputRef.current?.setCustomValidity("");
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <div
      className={`relative flex flex-col gap-1 ${className}`}
      ref={wrapperRef}
      onBlur={(e) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.relatedTarget)
        ) {
          setSearch(value.name);
          setIsOpen(false);
        }
      }}
      tabIndex={-1} // Make div focusable
    >
      {label && (
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        name={name}
        id={id}
        ref={inputRef}
        placeholder={value.name}
        onFocus={() => {
          setIsOpen(true);
          setSearch("");
        }}
        className="w-full rounded-md border bg-white px-3 py-2 placeholder:text-black"
        value={search}
        onChange={handleOnChange}
        autoComplete="off"
      />

      {isOpen && (
        <ul
          className={`absolute left-0 top-0 z-10 max-h-[200px] w-full overflow-y-scroll rounded-md border bg-white ${label ? "translate-y-[70px]" : "translate-y-[42px]"}`}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.name}
                className={`cursor-pointer p-2 ${option.name === value.name ? "bg-primary text-white" : "hover:bg-gray-100"}`}
                onClick={() => {
                  onChange(option);
                  setSearch(option.name);
                  setIsOpen(false);
                }}
              >
                {option.name}
              </li>
            ))
          ) : (
            <div className="px-2 py-4">Sin resultados</div>
          )}
        </ul>
      )}
    </div>
  );
}

/*

"use client";
import { ChangeEvent, RefObject, useRef, useState } from "react";

type Option = {
  name: string;
  [key: string]: any; // Allow arbitrary properties
};

type Props = {
  label?: string;
  name: string;
  id: string;
  options: Option[];
  onChange: (selectedValue: Option) => void;
  inputRef?: RefObject<HTMLInputElement>;
  className?: string;
  initialValue?: string;
};

export default function SelectSearchInput({
  label,
  name,
  id,
  options,
  onChange,
  inputRef,
  className,
  initialValue,
}: Props) {
  const initialOption = options.find((option) => option.name === initialValue);

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    initialOption,
  );

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={`relative flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      {!isOpen && (
        <input
          name={name}
          id={id}
          ref={inputRef}
          className="w-full rounded-md border bg-white px-3 py-2"
          onFocus={() => {
            //onFocus because it redirects to selecting a value
            setIsOpen(true);
            setSearch("");
            setTimeout(() => {
              searchRef.current?.focus(); // Focus the input after it becomes visible
            }, 10); // Ensure focus happens after the state update
          }}
          value={selectedOption?.name}
          onChange={() => {}}
        />
      )}
      {isOpen && (
        <>
          <input
            ref={searchRef}
            value={search}
            onChange={handleOnChange}
            onBlur={() => {
              setTimeout(() => {
                setIsOpen(false);
              }, 100);
            }}
            className="rounded-md border px-3 py-2"
          />
          <ul
            className={`absolute left-0 top-0 z-10 max-h-[200px] w-full overflow-y-scroll rounded-md border bg-white ${label ? "translate-y-[70px]" : "translate-y-[42px]"}`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.name}
                  className={`cursor-pointer p-2 ${option.name === selectedOption?.name ? "bg-primary text-white" : "hover:bg-gray-100"}`}
                  onClick={() => {
                    onChange(option);
                    setSelectedOption(option);
                    console.log(option.name);
                  }}
                >
                  {option.name}
                </li>
              ))
            ) : (
              <div className="px-2 py-4">Sin resultados</div>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
*/
