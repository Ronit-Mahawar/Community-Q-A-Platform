import authApi from "../api/authApi";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await authApi.ShowPost(page);
        console.log(res);
        setPosts(res.posts);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    loadPosts();
  }, [page]);

  console.log("1");
  const { user, loading } = useAuth();
  console.log(user);
  console.log("2");

  if (loading) return <p>Checking authentication...</p>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-4 p-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
