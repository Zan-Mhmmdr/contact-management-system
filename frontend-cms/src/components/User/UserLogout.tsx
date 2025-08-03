import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";
import { useNavigate } from "react-router";

const UserLogout = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await userLogout(token);
      const responseBody = await response.json();

      console.log(responseBody);

      if (response.status === 200) {
        setToken(""); // Clear token first
        navigate("/login"); // No need to await
      } else {
        alertError(responseBody.errors);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alertError("An unexpected error occurred during logout.");
    }
  };

  useEffectOnce(() => {
    handleLogout().then(() => console.log("User logged out successfully"));
  });

  return <></>;
};

export default UserLogout;
