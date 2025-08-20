import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useFeedback";

interface Props {
  children: JSX.Element;
  role?: "user" | "admin";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const user = useAppSelector((s) => s.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
