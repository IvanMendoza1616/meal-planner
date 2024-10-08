import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProfileContainer({ children }: Props) {
  return (
    <section className="shadow-md border rounded-lg sm:px-6 px-4 py-8">
      {children}
    </section>
  );
}
