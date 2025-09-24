import authApi from "../api/authApi";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Pagination from "../components/Pagination";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/authContext";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await authApi.ShowFeed(pageIndex);
        console.log(res);
        setPosts(res.posts);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    loadPosts();
  }, [pageIndex]);

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
      <Pagination
        pageIndex={pageIndex}
        totalPages={totalPages}
        onPageChange={setPageIndex}
      />
    </>
  );
};

export default Dashboard;
