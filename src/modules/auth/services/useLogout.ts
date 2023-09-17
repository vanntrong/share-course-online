import { useAuthContext } from "@/providers/authProvider";
import { removeCookie } from "@/utils/cookie";

const useLogout = () => {
  const { setUser } = useAuthContext();

  const logout = async () => {
    setUser(null);
    removeCookie("access-token");
  };

  return {
    logout,
  };
};

export default useLogout;
