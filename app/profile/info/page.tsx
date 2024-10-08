import UserForm from "@/app/components/profile/info/UserForm";
import ProfileContainer from "@/app/components/profile/ProfileContainer";
import getSession from "@/app/utils/getSession";

export default async function Page() {
  const session = await getSession("/profile/info");

  return (
    <ProfileContainer>
      <div className="mb-12">
        <h1 className="text-2xl font-semibold">User Information</h1>
        <p className="text-gray-500">View and edit your personal information</p>
      </div>
      <UserForm sessionUser={session.user} />
    </ProfileContainer>
  );
}
