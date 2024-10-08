import { signIn } from "@/auth";
import Button from "../UI/Button";

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Sign In with Google</Button>
    </form>
  );
}
