import { useAuthContext } from "@/providers/authProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default ProtectedRoutes;
