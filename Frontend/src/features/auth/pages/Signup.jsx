import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default Signup;
