import { Navigate } from "react-router";
import { useLocalStorage } from "react-use";

const ProtectedRoute = ({ children }) => {
  const [token] = useLocalStorage("token");

  if (!token) {
    return <Navigate to="/login" replace/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
