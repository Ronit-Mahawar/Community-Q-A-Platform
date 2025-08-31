import { createContext, useContext, useEffect, useState } from "react";
import AuthApi from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthApi.GetMe()
      .then((data) => setUser(data?.user || null))
      .finally(() => setLoading(false));
  }, []);

  console.log("auth running")
  console.log(user)

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
