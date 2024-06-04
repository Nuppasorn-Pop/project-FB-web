import useProfile from "../../../hooks/useProfile";
import { RELATIONSHIP_TO_AUTH_USER } from "../../../constants";
import MeAction from "./MeAction";
import UnknownAction from "./UnknownAction";
import RecevierAction from "./RecevierAction";
import SenderAction from "./SenderAction";
import FriendAction from "./FriendAction";

const componentMapping = {
  [RELATIONSHIP_TO_AUTH_USER.ME]: <MeAction />,
  [RELATIONSHIP_TO_AUTH_USER.UNKNOWN]: <UnknownAction />,
  [RELATIONSHIP_TO_AUTH_USER.RECEVIER]: <RecevierAction />,
  [RELATIONSHIP_TO_AUTH_USER.SENDER]: <SenderAction />,
  [RELATIONSHIP_TO_AUTH_USER.FRIEND]: <FriendAction />,
};

export default function ProfileAction() {
  const { relationShipToAuthUser } = useProfile();
  return <>{componentMapping[relationShipToAuthUser]}</>;
}
