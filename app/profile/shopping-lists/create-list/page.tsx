import ProfileContainer from "@/app/components/profile/ProfileContainer";
import getSession from "@/app/utils/getSession";
import CreateListSteps from "@/app/components/profile/shopping-lists/create-list/CreateListSteps";

export default async function Page() {
  const session = await getSession("/profile/shopping-lists");

  return (
    <ProfileContainer>
      <CreateListSteps user={session.user.email} />
    </ProfileContainer>
  );
}
