import Button from "../../../components/Button";
import useProfile from "../../../hooks/useProfile";

export default function FriendAction() {
  const { unfriend } = useProfile();
  return (
    <div>
      <Button bg="gray" onClick={unfriend}>
        Unfriend
      </Button>
    </div>
  );
}
