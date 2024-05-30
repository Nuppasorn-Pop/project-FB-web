import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthLoading } = useAuth();
  // !authUser ==> ไม่ได้ login (null)
  // !isAuthLoading ==> fales ==>
  if (!authUser && !isAuthLoading) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {isAuthLoading && <Spinner />}
      {children}
    </>
  );
}
