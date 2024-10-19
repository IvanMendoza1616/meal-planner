import ActiveLink from "../components/UI/ActiveLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faUser,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";
import getSession from "../utils/getSession";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and edit your personal information, recipes and grocery lists.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getSession("/profile/recipes");

  return (
    <>
      <div className="flex py-4 mb-4 gap-12 xs:gap-4 xs:justify-start justify-center items-center">
        <ActiveLink href="/profile/info">
          <FontAwesomeIcon className="h-5 w-5 xs:p-[2px]" icon={faUser} />
          <span className="hidden xs:inline-block">Mi Cuenta</span>
        </ActiveLink>
        <ActiveLink href="/profile/recipes">
          <FontAwesomeIcon className="h-5 w-5" icon={faUtensils} />
          <span className="hidden xs:inline-block">Mis Recetas</span>
        </ActiveLink>
        <ActiveLink href="/profile/grocery-lists">
          <FontAwesomeIcon className="h-5 w-5" icon={faListCheck} />
          <span className="hidden xs:inline-block">Mis Listas</span>
        </ActiveLink>
      </div>
      {children}
    </>
  );
}
