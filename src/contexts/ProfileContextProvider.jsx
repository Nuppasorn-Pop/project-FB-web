import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import userApi from "../apis/user";
import useAuth from "../hooks/useAuth";
import { RELATIONSHIP_TO_AUTH_USER } from "../constants";
import relationshipApi from "../apis/relationship";

export const ProfileContext = createContext();
export default function ProfileContextProvider({ children }) {
  const [profileUser, setProfileUser] = useState(null);
  const [relationShipToAuthUser, setRelationShipToAuthUser] = useState("");
  const { userId } = useParams();
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const res = await userApi.getProfileUser(userId);
        setProfileUser(res.data.user);
        setRelationShipToAuthUser(res.data.relationShipToAuthUser);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileUser();
  }, [userId]);

  // เมื่อ User คลิกไปที่หน้า profile ตัวเอง มันจะไม่มีการ relender ดังนั้นต้องใช้ useEffect แล้วหน้า profile จะเปลี่ยนไปตาม userId ดังนั้นจึงต้องใส่ userId ใน []

  useEffect(() => {
    if (authUser?.id === +userId) {
      setProfileUser(authUser);
    }
  }, [authUser, userId]);

  const requestFriend = async () => {
    await relationshipApi.requestFriend(userId);
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.RECEVIER);
  };

  const cancelRequest = async () => {
    await relationshipApi.cancelFriend(userId);
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.UNKNOWN);
  };

  const confirmRequest = async () => {
    await relationshipApi.confirmRequest(userId);
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.FRIEND);
  };

  const rejectRequest = async () => {
    await relationshipApi.rejectRequest(userId);
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.UNKNOWN);
  };

  const unfriend = async () => {
    await relationshipApi.unfriend(userId);
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.UNKNOWN);
  };

  const value = {
    profileUser,
    relationShipToAuthUser,
    requestFriend,
    cancelRequest,
    confirmRequest,
    rejectRequest,
    unfriend,
  };
  // params ==> {userId: '7'} ==> path: "profile/:userId"

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
