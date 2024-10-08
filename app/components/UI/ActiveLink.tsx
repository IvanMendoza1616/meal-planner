"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  children: ReactNode;
};

export default function ActiveLink({ href, children }: Props) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      className={`${
        isActive ? "bg-primary text-white" : "hover:bg-primary-light-hover"
      } flex items-center gap-2 rounded-md xs:px-4 xs:py-2 p-4 transition ease-in-out`}
      href={href}
    >
      {children}
    </Link>
  );
}
