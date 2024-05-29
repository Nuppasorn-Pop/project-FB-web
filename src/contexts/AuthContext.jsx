import { useState } from "react";
import { createContext } from "react";
import authApi from "../apis/auth";
import { setAccessToken, removeAccessToken } from "../utils/local-strorage";

export const AuthContext = createContext();

// logic ในการอัพเดท auth user จะอยู่ในนี้ทั้งหมด
export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  // check authUser {} ==> true
  // check authUser null ==> false ==> user ไม่ได้ล็อคอิน

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);

    const resGetAuthUser = await authApi.getAuthUser();
    console.log(resGetAuthUser);
    setAuthUser(resGetAuthUser.data.user);
    return resGetAuthUser;
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, authUser }}>
      {children}
    </AuthContext.Provider>
  );
}
