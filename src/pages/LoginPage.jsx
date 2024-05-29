import LoginForm from "../features/authentication/component/LoginForm";
import RegisterContainer from "../features/authentication/component/RegisterContainer";

function LoginPage() {
  return (
    <div className="bg-white p-4 rounded-lg max-w-sm mx-auto shadow-lg mt-32">
      <LoginForm />
      <hr className="my-6 border" />
      <RegisterContainer />
    </div>
  );
}

export default LoginPage;
