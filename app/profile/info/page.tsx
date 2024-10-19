import UserForm from "@/app/components/forms/UserForm";
import ProfileContainer from "@/app/components/profile/ProfileContainer";
import getSession from "@/app/utils/getSession";

export default async function Page() {
  const session = await getSession("/profile/info");

  return (
    <ProfileContainer>
      <div className="mb-12">
        <h1 className="text-2xl font-semibold">Mi Cuenta</h1>
        <p className="text-gray-500">Mira y edita tu información personal</p>
      </div>
      <UserForm sessionUser={session.user} />
    </ProfileContainer>
  );
}
