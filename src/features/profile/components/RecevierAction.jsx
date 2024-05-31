import Button from "../../../components/Button";
import useProfile from "../../../hooks/useProfile";

export default function RecevierAction() {
  const { cancelRequest } = useProfile();
  return (
    <div>
      <Button bg="gray" onClick={cancelRequest}>
        Cancel Request
      </Button>
    </div>
  );
}
