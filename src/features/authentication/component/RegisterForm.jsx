import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/input";

const initialInput = {
  firstName: "",
  lastName: "",
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);

  const handleOnchange = (e) => {
    return setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            name="firstName"
            placeholder="First name"
            value={input.firstName}
            onChange={handleOnchange}
          />
        </div>
        <div>
          <Input
            name="lastName"
            placeholder="Last name"
            value={input.lastName}
            onChange={handleOnchange}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="emailOrMobile"
            placeholder="Email address or mobile number"
            value={input.emailOrMobile}
            onChange={handleOnchange}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleOnchange}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={handleOnchange}
          />
        </div>
        <div className="col-span-2 text-center">
          <Button bg="green" color="white" width="40">
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
}
