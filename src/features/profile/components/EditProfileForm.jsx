import PictureForm from "./PictureForm";
import useAuth from "../../../hooks/useAuth";

export default function EditProfileForm() {
  const { authUser } = useAuth();
  return (
    <div>
      <PictureForm
        title="Profile Image"
        initialImage={authUser?.profileImage}
      />
      {/* <PictureForm title="Cover Image" /> */}
    </div>
  );
}
