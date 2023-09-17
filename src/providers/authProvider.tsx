import { User } from "@/modules/auth/types";
import React, { PropsWithChildren } from "react";

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = React.createContext<AuthContext>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => React.useContext(AuthContext);

export default AuthContext;
