import React, { useState } from "react";
import Navbar from "../components/Navbar";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SigninForm = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value, // ✅ key comes from variable
    });
    console.log(userFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authApi.SignIn(userFormData);

    console.log("Signin Form", res);
    if (res.data !== "invalid password" && res.data !== "invalid email") {
      setUser(res.data.user);
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none border-gray-300"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default SigninForm;
