import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import { RightFromBracketIcon } from "../icon";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const { logout, authUser } = useAuth();
  const navigate = useNavigate();

  const handleClikLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };
  return (
    <div className="relative">
      <div role="button" onClick={() => setOpen((prev) => !prev)}>
        <Avatar src={authUser?.profileImage} />
      </div>
      {open && (
        <div className="absolute right-0 translate-y-1.5">
          <div className="w-80 h-40 rounded-lg shadow-[0_0_6px_rgb(0,0,0,0.2)] bg-white">
            <Link
              to={`/profile/${authUser?.id}`}
              onClick={() => setOpen((prev) => !prev)}
            >
              <div className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2">
                <Avatar size={3.75} src={authUser?.profileImage} />
                <div className="flex flex-col">
                  <h2 className="font-semibold">
                    {authUser?.firstNmae} {authUser?.lastName}
                  </h2>
                  <small className="text-gray-500">See your profile</small>
                </div>
              </div>
            </Link>
            <hr className="my-2 mx-2 border-gray-300" />
            <div
              className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded-lg"
              role="button"
              onClick={handleClikLogout}
            >
              <div className=" bg-gray-300  w-9 h-9 rounded-full flex items-center justify-center">
                <RightFromBracketIcon />
              </div>
              <span className="text-sm font-semibold">Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
