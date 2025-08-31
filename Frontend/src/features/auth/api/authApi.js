import axios from "axios";

const AddPost = async (form) => {
  try {
    const res = await axios.post(
      "http://localhost:9000/api/post/addPost",
      form
    );
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
  return "post added";
};

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
    console.log("res from signin", res);
    return res;
  } catch (err) {
    console.error(err);
  }
  return "done";
};
const GetMe = async () => {
  try {
    const res = await axios.get("http://localhost:9000/api/users/me", {
      withCredentials: true, // 👈 send cookie
    });
    console.log("getMe running");
    return res.data; // { user: { _id, fullName, email } }
  } catch (err) {
    console.error("GetMe error:", err);
    return null; // not logged in
  }
};

export default { SignIn, SignUp, GetMe, AddPost };
