import Joi from "joi";
const registerSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .min(8)
    .messages({ "string.empty": "first name is require." })
    .messages({ "string.min": "first name must be at least 8 characters." }),
  lastName: Joi.string()
    .required()
    .trim()
    .min(8)
    .messages({ "string.empty": "last name is require." })
    .messages({ "string.min": "last name must be at least 8 characters." }),
  emailOrMobile: Joi.alternatives([
    // {tlds: false} ==> จะเป็นอะไรก็ได้ ex .com, .net etc
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0-9]{10}$/),
  ]).messages({
    "alternatives.match": "invalid email adress or phone number.",
  }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^[0-9a-zA-Z]{5,}$"))
    .messages({ "string.empty": "password is require." }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "password and confirm password did not match." }),
});

// validateRegister FN ถ้าเจอ error จะ return result ออกไป
// ถ้าไม่พบ error จะ return undefined
const validateRegister = (inputRegister) => {
  const { error } = registerSchema.validate(inputRegister, {
    abortEarly: false,
  });
  // ต้องแปลง array details เป็น object เพื่อจะได้นำ message มาตั้ง setTextError
  // value = message
  console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    // console.log(result);
    return result;
  }
};

export default validateRegister;

//------------------------------- test joi ------------------------------
// const { error } = registerSchema.validate(
//   {
//     firstName: "df4sd5f4ds5f",
//     lastName: "5esf45dfddf",
//     emailOrMobile: "abc@mail.com",
//     password: "123456",
//     confirmPassword: "12345",
//   },
//   { abortEarly: false }
// );
// {abortEarly: false} ==> เช็ดหมดก่อนว่ามี error ไหมแล้วค่อยแสดงผลลัพธ์ที่ error
// console.dir(error);
