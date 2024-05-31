import { useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export const ProfileContext = createContext();
export default function ProfileContextProvider({ children }) {
  const [profileUser, setProfileUser] = useState(null);
  const params = useParams();
  // {userId: '7'} ==> path: "profile/:userId"
  console.log(params);

  return <ProfileContext.Provider>{children}</ProfileContext.Provider>;
}
