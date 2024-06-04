import Button from "../../../components/Button";
import useProfile from "../../../hooks/useProfile";
export default function SenderAction() {
  const { confirmRequest, rejectRequest } = useProfile();
  return (
    <div className="flex gap-4">
      <Button bg="blue" color="white" onClick={confirmRequest}>
        Confirm request
      </Button>
      <Button bg="gray" onClick={rejectRequest}>
        Delete request
      </Button>
    </div>
  );
}
