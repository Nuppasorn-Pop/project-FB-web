const ACCESS_TOKEN = "ACCESS_TOKEN";

// เพิ่ม token ใน localStorage
export const setAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token);

// read token ใน localStorage
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

// ลบ token ใน localStorage
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
