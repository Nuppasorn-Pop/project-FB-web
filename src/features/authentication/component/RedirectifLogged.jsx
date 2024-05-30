import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";
export default function RedirectifLogged({ children }) {
  const { authUser, isAuthLoading } = useAuth();
  if (authUser && !isAuthLoading) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isAuthLoading && <Spinner />}
      {children}
    </>
  );
}
