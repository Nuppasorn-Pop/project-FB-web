import ProfileContainer from "../features/profile/components/ProfileContainer";
import ProfileContextProvider from "../contexts/ProfileContextProvider";

export default function ProfilePage() {
  return (
    <ProfileContextProvider>
      <ProfileContainer />
    </ProfileContextProvider>
  );
}
