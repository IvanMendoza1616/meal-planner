import { ReactNode } from "react";

type Props = {
  children: ReactNode | string;
  type: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};
export default function Button({
  children,
  type,
  variant,
  onClick,
  disabled,
}: Props) {
  const style =
    variant === "secondary"
      ? "bg-white border hover:bg-primary-light-hover"
      : `rounded-lg shadow-md bg-primary hover:bg-primary-hover text-white`;

  return (
    <button
      className={`flex items-center justify-center gap-2 text-nowrap rounded-md px-4 py-2 transition ease-in-out ${style}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
