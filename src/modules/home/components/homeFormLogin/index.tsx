import {
  Button,
  Checkbox,
  Container,
  Flex,
  Loader,
  Space,
  TextInput,
  Title,
  Divider,
} from "@mantine/core";
import classNames from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginPayload,
  loginValidation,
} from "@/modules/auth/validations/loginValidation";
import { FC } from "react";

interface HomeFormLoginProps {
  onSubmit: (data: LoginPayload) => void;
  isLoading?: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const HomeFormLogin: FC<HomeFormLoginProps> = ({
  onSubmit,
  isLoading,
  setIsLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
  });

  return (
    <Container className={classNames.container}>
      <Title
        order={3}
        className={classNames.title}
        weight={500}
        color="indigo"
        mt={"md"}
      >
        Đăng nhập
      </Title>
      <div>
        <TextInput
          placeholder="Username"
          label="Username"
          withAsterisk
          {...register("login")}
          error={errors.login?.message}
        />
        <Space h="sm" />
        <TextInput
          placeholder="Mật khẩu"
          label="Mật khẩu"
          withAsterisk
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Space h="sm" />
        <Checkbox
          label="Tôi đồng ý với thoả thuận sử dụng của TaiLieuVN"
          required
          {...register("checkbox")}
        />
        <Space h="sm" />
        <Button
          fullWidth
          disabled={!isValid || isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          <Flex direction={"row"} justify={"center"} gap={"md"}>
            {isLoading && <Loader />}
            <span>Đăng nhập</span>
          </Flex>
        </Button>

        <Divider
          orientation="horizontal"
          my={"sm"}
          label="Hoặc"
          labelPosition="center"
        />

        <Button fullWidth onClick={() => setIsLogin(false)}>
          <Flex direction={"row"} justify={"center"} gap={"md"}>
            <span>Đăng Ký</span>
          </Flex>
        </Button>
      </div>
    </Container>
  );
};

export default HomeFormLogin;
