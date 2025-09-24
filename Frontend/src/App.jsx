import React from "react";
import Signup from "./features/auth/pages/Signup";
import Signin from "./features/auth/pages/Signin";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DashBoard from "./features/auth/pages/DashBoard";
import AddPost from "./features/auth/pages/AddPost";
import PostPage from "./features/auth/pages/PostPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />}></Route>

          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/addPost" element={<AddPost />}></Route>
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
