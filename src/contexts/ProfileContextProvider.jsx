import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import userApi from "../apis/user";
import useAuth from "../hooks/useAuth";
import { RELATIONSHIP_TO_AUTH_USER } from "../constants";

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

  const requestFriend = () => {
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.RECEVIER);
  };

  const cancelRequest = () => {
    setRelationShipToAuthUser(RELATIONSHIP_TO_AUTH_USER.UNKNOWN);
  };

  const value = {
    profileUser,
    relationShipToAuthUser,
    requestFriend,
    cancelRequest,
  };
  // params ==> {userId: '7'} ==> path: "profile/:userId"

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
