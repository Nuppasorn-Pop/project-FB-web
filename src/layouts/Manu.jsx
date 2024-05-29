import { HouseIcon, UserGroupIcon, UserInIcon } from "../icon";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";

const menuList = [
  { id: 1, Icon: HouseIcon, to: "/" },
  { id: 2, Icon: UserGroupIcon, to: "/friend" },
];
export default function Manu() {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-center gap-2 py-1.5">
      {menuList.map((item) => (
        <MenuItem
          key={item.id}
          Icon={item.Icon}
          to={item.to}
          active={pathname === item.to}
        />
      ))}
    </nav>
  );
}
