import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";

type Props = {
  children: ReactNode;
};

export default function SubmitButton({ children }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Loading" : children}
    </Button>
  );
}
