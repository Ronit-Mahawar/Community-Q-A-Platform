import axios from "axios";

const SignUp = async (form) => {
  try {
    const res = await axios.post(
      "http://localhost:9000/api/users/signup",
      form
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
  return "hello";
};
const SignIn = async (form) => {
  try {
    const res = await axios.post(
      "http://localhost:9000/api/users/signin",
      form,
      {
        withCredentials: true,
      }
    );
    console.log(res);
  } catch (err) {
    console.error(err);
  }
  return "hello";
};

export default { SignIn, SignUp };
