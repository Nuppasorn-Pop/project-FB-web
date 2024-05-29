import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/input";
import validateRegister from "../validators/validate-register";
import authApi from "../../../apis/auth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const initialInput = {
  firstName: "",
  lastName: "",
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [textError, setTextError] = useState(initialInputError);

  const handleOnchange = (e) => {
    return setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);
      // ต้องแปลง array details เป็น object เพื่อจะได้นำ message มาตั้ง setTextError
      // ไปทำ reduce() ที่ validateRegister Fn
      if (error) {
        return setTextError(error);
        // ไม่ได้นำ setTextError(error) ไปใช้งานต่อ
        // ใส่ return ไว้เป็นการบอกว่าให้จบการทำงานถ้าเจอ error
      }
      setTextError({ ...initialInput }); // => เรียกอัปเดทครั้งที่ 1

      // ส่งข้อมูลไป backend
      await authApi.register(input);
      onSuccess();
      toast.success("registered successfully. please log in to continue");
    } catch (err) {
      console.log(err);
      // err instanceof AxiosError ==> เช็คว่า err เป็น instance ที่ถูกสร้างมาจาก AxiosError หรือไม่
      if (err instanceof AxiosError) {
        if (err.response.data.field === "emailOrMobile") {
          setTextError((prev) => ({
            ...prev,
            emailOrMobile: "email or mobile already in use",
          }));
        } // => เรียกอัปเดทครั้งที่ 2 การใช้ prev มันจะไปนำค่า initialInput จากการอัปเดทครั้งที่ 1
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid grid-cols-2 gap-4 text-start">
        <div>
          <Input
            name="firstName"
            placeholder="First name"
            value={input.firstName}
            onChange={handleOnchange}
            error={textError.firstName}
          />
        </div>
        <div>
          <Input
            name="lastName"
            placeholder="Last name"
            value={input.lastName}
            onChange={handleOnchange}
            error={textError.lastName}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="emailOrMobile"
            placeholder="Email address or mobile number"
            value={input.emailOrMobile}
            onChange={handleOnchange}
            error={textError.emailOrMobile}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleOnchange}
            error={textError.password}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={handleOnchange}
            error={textError.confirmPassword}
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
