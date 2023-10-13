import { UserRole } from "@/modules/auth/types";
import { useAuthContext } from "@/providers/authProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useAuthContext();

  if (!user || user.role !== UserRole.Admin) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default ProtectedRoutes;
