import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function getSession(redirectUrl: string) {
  const session = await auth();
  if (!session) redirect(`/sign-in?redirectTo=${redirectUrl}`);
  return session;
}
