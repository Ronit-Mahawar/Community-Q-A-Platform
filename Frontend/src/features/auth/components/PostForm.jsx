import React from "react";
import { useState } from "react";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const navigate = useNavigate();
  const [postFormData, setPostForm] = useState({
    title: "",
    body: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;

    setPostForm({
      ...postFormData,
      [name]: value,
    });
    console.log(postFormData);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const res = await authApi.AddPost(postFormData);
    if (res.data === "post added") {
      navigate("/");
    }
    console.log(res);
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" onChange={HandleChange} />
        <br />
        <label htmlFor="body">Body</label>
        <textarea id="body" type="text" name="body" onChange={HandleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
