"use client";
import { useFormState } from "react-dom";
import TextInput from "../../UI/inputs/TextInput";
import FormMessage from "../../UI/FormMessage";
import SubmitButton from "../../UI/SubmitButton";
import { updateUserAction } from "@/app/actions/updateUserAction";

type Props = {
  sessionUser: {
    name: string;
    email: string;
    image: string;
  };
};

export default function ProfileForm({ sessionUser }: Props) {
  const [state, formAction] = useFormState(updateUserAction, {
    success: false,
    message: "",
    email: sessionUser.email,
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Email</p>
        <p>{sessionUser.email}</p>
      </div>
      <TextInput
        label="Name"
        placeholder="John Doe"
        name="name"
        id={"name"}
        defaultValue={sessionUser.name}
        required
      />
      <div className="mt-8 flex flex-col gap-4">
        <FormMessage message={state.message} success={state.success} />
        <SubmitButton>Update</SubmitButton>
      </div>
    </form>
  );
}
