import React from "react";
import HomeFormLogin from "../homeFormLogin";
import useLogin from "@/modules/auth/services/useLogin";
import HomeFormRegister from "../homeFormRegister";
import useRegister from "@/modules/auth/services/useRegister";

const HomeAuth = () => {
  const { mutate: login, isLoading: isLoginLoading } = useLogin();
  const { mutate: register, isLoading: isRegisterLoading } = useRegister();
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <>
      {isLogin ? (
        <HomeFormLogin
          onSubmit={login}
          isLoading={isLoginLoading}
          setIsLogin={setIsLogin}
        />
      ) : (
        <HomeFormRegister
          onSubmit={register}
          isLoading={isRegisterLoading}
          setIsLogin={setIsLogin}
        />
      )}
    </>
  );
};

export default HomeAuth;
