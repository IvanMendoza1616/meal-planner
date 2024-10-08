import type { Metadata } from "next";
import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Meal Planner.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { redirectTo: string };
}) {
  const session = await auth();
  if (session) redirect("/");

  return (
    <main className="px-4">
      <section className="mx-auto flex w-full max-w-[400px] flex-col items-center gap-12 rounded-lg border p-6 shadow-md">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">Sign in</h2>
          <p>Choose your preferred sign in method</p>
        </div>
        <div className="flex w-full flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: searchParams.redirectTo });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md border px-2 py-2 transition ease-in-out hover:border-primary-light hover:bg-primary-light"
            >
              <FontAwesomeIcon
                className="h-4 w-4 text-primary"
                icon={faGoogle}
              />
              Sign In with Google
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
