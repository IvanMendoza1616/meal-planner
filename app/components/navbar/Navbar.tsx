import { auth } from "@/auth";
import SignInGoogle from "./SignInGoogle";
import SignOut from "./SignOut";
import Link from "next/link";

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
          <SignInGoogle />
        ) : (
          <div className="flex gap-4 items-center">
            <SignOut />
          </div>
        )}
      </nav>
    </div>
  );
}
