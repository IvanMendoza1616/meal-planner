import { auth } from "@/auth";
import SignOut from "./SignOut";
import Link from "next/link";
import Button from "../UI/Button";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="shadow-md mb-8">
      <nav className="flex items-center justify-between py-8 max-w-[1200px] mx-auto px-4">
        <Link href="/">Morita Recipes</Link>
        <div>
          <Link href="/profile/info">Profile</Link>
        </div>
        {!session ? (
          <Link href="/sign-in">
            <Button type="button">Inicia Sesión</Button>
          </Link>
        ) : (
          <div className="flex gap-4 items-center">
            <SignOut />
          </div>
        )}
      </nav>
    </div>
  );
}
