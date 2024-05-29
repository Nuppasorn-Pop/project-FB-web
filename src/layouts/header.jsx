import { Link } from "react-router-dom";
import { FacebookIcon } from "../icon";
import Manu from "./Manu";
import Dropdown from "./Dropdown";

export default function Header() {
  return (
    <header className="grid grid-cols-3 bg-white shadow px-4 items-center">
      <div className="flex justify-self-start">
        <Link to="/">
          <FacebookIcon />
        </Link>
      </div>
      <div>
        <Manu />
      </div>
      <div className="justify-self-end">
        <Dropdown />
      </div>
    </header>
  );
}
