// components/User/UserLogout.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi";

const UserLogout = () => {
  const [token, , removeToken] = useLocalStorage("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        if (token) {
          await userLogout(token); // Panggil API
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        removeToken(); // Selalu hapus token
        navigate("/login", { replace: true }); // Redirect ke login
      }
    };

    logout();
  }, []);

  return null;
};

export default UserLogout;
