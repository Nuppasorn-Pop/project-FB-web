import { useState } from "react";
import { createContext } from "react";
import authApi from "../apis/auth";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../utils/local-strorage";
import { useEffect } from "react";

export const AuthContext = createContext();

// ------------ login แล้ว ต้องจดจำ user ได้ โดยไม่ต้อง Login ใหม่------------
// มีหลายวิธี
// 1. fetch on render  : fetch after 1st render
// 2. fetch then render : promise all feature (ex.post,user,comment) ต้องเรียกมาหมดพร้อมกัน
// แนะนำใช้ => 3. render as you fetch eg. react-queary swr, react version 19 use(promise) เมื่อมีการ fetch ครั้งแรก มันจะจดจำข้อมูลที่มาจากการ fetch ครั้งแรก เมื่อมีการ fetch ครั้งถัดไป มันจะไปดึงข้อมูลจากการ fetch ครั้งแรกที่จดจำไว้

// logic ในการอัพเดท auth user จะอยู่ในนี้ทั้งหมด
export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  // check authUser {} ==> true
  // check authUser null ==> false ==> user ไม่ได้ล็อคอิน

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  // after 1st render => isAuthLoading เป็น true เสมอ

  // -----login แล้ว ต้องจดจำ user ได้ โดยไม่ต้อง Login ใหม่ และ fetch ข้อมูลอื่น ๆ มาแสดงที่หน้า browser ได้ -----
  // ===> ใช้ useEffect ในการ fetch และ interceptor ในการเขียน logic
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAuthLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);

    const resGetAuthUser = await authApi.getAuthUser();
    // console.log(resGetAuthUser);
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, authUser, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
