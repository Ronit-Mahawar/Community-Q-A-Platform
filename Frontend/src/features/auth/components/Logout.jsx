import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { useAuth } from "../context/authContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await authApi.Logout();

      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="text-white text-lg transition duration-200 hover:opacity-80"
    >
      <i className="fi fi-rr-comment-dots"></i>Logout
    </button>
  );
};

export default Logout;
