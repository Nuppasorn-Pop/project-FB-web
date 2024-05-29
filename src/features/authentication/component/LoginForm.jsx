import Input from "../../../components/input";
import Button from "../../../components/Button";
import { useState } from "react";
import validateLogin from "../validators/valisate-login";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const initialInput = {
  emailOrMobile: "",
  password: "",
};
const initialInputError = {
  emailOrMobile: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      }
      setInputError(initialInputError);

      await login(input);
      navigate("/");
      toast.success("login sucessfully");
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        const message =
          err.response.status === 400
            ? "invalid email or mobile or password"
            : "internal server error";

        return toast.error(message);
      }
    }
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-4">
        <div>
          <Input
            name="emailOrMobile"
            placeholder="Email address or phone number"
            value={input.emailOrMobile}
            error={inputError.emailOrMobile}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={input.password}
            error={inputError.password}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Button bg="blue" color="white" width="full">
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
}
