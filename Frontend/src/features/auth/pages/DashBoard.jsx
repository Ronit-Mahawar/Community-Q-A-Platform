import Navbar from "../components/Navbar";
import PostForm from "../components/PostForm";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  console.log("1");
  const { user, loading } = useAuth();
  console.log(user);
  console.log("2");

  if (loading) return <p>Checking authentication...</p>;

  return (
    <>
      <Navbar />
      <div>
        <h1>Dashboard</h1>
        <div>... show list of questions ...</div>

        {user ? (
          <form>
            <textarea placeholder="Write a comment..."></textarea>
            <button type="submit">Comment</button>
          </form>
        ) : (
          <p>You must be signed in to comment.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
