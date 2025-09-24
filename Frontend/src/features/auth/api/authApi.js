import axios from "axios";

const AddPost = async (form) => {
  try {
    const res = await axios.post(
      "http://localhost:9000/api/post/addPost",
      form,
      {
        withCredentials: true,
      }
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
    const res = await axios.post("http://localhost:9000/api/user/signup", form);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
  return "hello";
};
const SignIn = async (form) => {
  try {
    const res = await axios.post(
      "http://localhost:9000/api/user/signin",
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
    const res = await axios.get("http://localhost:9000/api/user/me", {
      withCredentials: true, // 👈 send cookie
    });
    console.log("getMe running");
    return res.data; // { user: { _id, fullName, email } }
  } catch (err) {
    console.error("GetMe error:", err);
    return null; // not logged in
  }
};
const ShowFeed = async (page) => {
  const limit = 5;
  try {
    const res = await axios.get(
      `http://localhost:9000/api/post?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );
    console.log(res);
    {
      /*
      "_id": "68bae870b16d9fea5f5b5a35",
      "title": "title",
      "body": "body",
      "tags": [],
      "postBy": {
          "_id": "68a5af4904c8799341443851",
          "fullName": "ronit",
          "email": "ronitmahawar12@gmail.com",
          "password": "a935742fc24a9fbcd80b060e8a6e603dfea0f4268c8a17977d6863cf736a06b8",
          "role": "USER",
          "createdAt": "2025-08-20T11:19:37.811Z",
          "updatedAt": "2025-08-20T11:19:37.811Z",
          "salt":"�V�|����\t�%�p��",
          "__v": 0
      },
 
      "upvoteCount": 0,
      "downvoteCount": 0,
      "CommentCount": 0,
      "createdAt": "2025-09-05T13:41:04.066Z",
      "updatedAt": "2025-09-05T13:41:04.066Z",
      "__v": 0*/
    }
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
const ShowPost = async (postId) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/post/${postId}`, {
      withCredentials: true,
    });
    console.log(res);
    {
      //  {
      //     "post": {
      //         "commentCount": 0,
      //         "_id": "68bae870b16d9fea5f5b5a35",
      //         "title": "title",
      //         "body": "body",
      //         "tags": [],
      //         "postBy": "68a5af4904c8799341443851",
      //         "upvotes": [],
      //         "downvotes": [],
      //         "comments": [],
      //         "upvoteCount": 4,
      //         "downvoteCount": 5,
      //         "CommentCount": 0,
      //         "createdAt": "2025-09-05T13:41:04.066Z",
      //         "updatedAt": "2025-09-20T12:50:10.905Z",
      //         "__v": 0
      //     },
      //     "comments": [
      //         {
      //             "_id": "68cf58e203226d12bdadf8ea",
      //             "content": "This is a dummy comment",
      //             "user": "68a5af4904c8799341443851",
      //             "post": "68bae870b16d9fea5f5b5a35",
      //             "parentComment": null,
      //             "upvoteCount": 0,
      //             "downvoteCount": 0,
      //             "createdAt": "2025-09-21T01:46:10.941Z",
      //             "updatedAt": "2025-09-21T01:46:10.941Z",
      //             "__v": 0
      //         },
      //         {
      //             "_id": "68cf59471084f665db1d5f77",
      //             "content": "This is a dummy comment second",
      //             "user": "68a5af4904c8799341443851",
      //             "post": "68bae870b16d9fea5f5b5a35",
      //             "parentComment": null,
      //             "upvoteCount": 0,
      //             "downvoteCount": 0,
      //             "createdAt": "2025-09-21T01:46:10.941Z",
      //             "updatedAt": "2025-09-21T01:46:10.941Z",
      //             "__v": 0
      //         }
      //     ]
    }
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
const Logout = async () => {
  try {
    await axios.post(
      "http://localhost:9000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  }
};
const Vote = async (postId, type) => {
  try {
    const res = await axios.post(
      `http://localhost:9000/api/post/${postId}/vote`,
      { type },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error(err.message);
    return "invalid token";
  }
};
const AddComment = async (postId, content, parentComment = null) => {
  try {
    const res = await axios.post(
      `http://localhost:9000/api/comment/${postId}`,
      { content, parentComment },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("AddComment error:", err);
    return null;
  }
};

const GetComments = async (postId) => {
  try {
    const res = await axios.get(`http://localhost:9000/api/comment/${postId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("GetComments error:", err);
    return [];
  }
};

export default {
  SignIn,
  SignUp,
  GetMe,
  AddPost,
  ShowPost,
  ShowFeed,
  Logout,
  Vote,
  AddComment,
  GetComments,
};
