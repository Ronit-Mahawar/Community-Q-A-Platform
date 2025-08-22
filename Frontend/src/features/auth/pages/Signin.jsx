import Navbar from "../components/Navbar";
import SigninForm from "../components/SigninForm";

const Signin = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <SigninForm />
        </div>
      </div>
    </>
  );
};

export default Signin;
