import ProfileContainer from "@/app/components/profile/ProfileContainer";

export default async function Page() {
  return (
    <ProfileContainer>
      <div className="mb-12">
        <h1 className="text-2xl font-semibold">My Grocery Lists</h1>
        <p className="text-gray-500">View and edit your grocery lists</p>
      </div>
    </ProfileContainer>
  );
}
