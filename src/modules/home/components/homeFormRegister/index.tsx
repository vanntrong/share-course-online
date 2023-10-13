import {
  RegisterPayload,
  registerValidation,
} from "@/modules/auth/validations/registerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FC } from "react";
import { useForm } from "react-hook-form";
import classNames from "./styles.module.scss";

interface HomeFormRegisterProps {
  onSubmit: (data: RegisterPayload) => void;
  isLoading?: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const HomeFormRegister: FC<HomeFormRegisterProps> = ({
  onSubmit,
  isLoading,
  setIsLogin,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerValidation),
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
        Đăng ký
      </Title>
      <div>
        <TextInput
          placeholder="Họ"
          label="Họ"
          withAsterisk
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Space h="sm" />
        <TextInput
          placeholder="Tên"
          label="Tên"
          withAsterisk
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Space h="sm" />
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
            <span>Đăng Ký</span>
          </Flex>
        </Button>

        <Divider
          orientation="horizontal"
          my={"sm"}
          label="Hoặc"
          labelPosition="center"
        />

        <Button fullWidth onClick={() => setIsLogin(true)}>
          <Flex direction={"row"} justify={"center"} gap={"md"}>
            <span>Đăng Nhập</span>
          </Flex>
        </Button>
      </div>
    </Container>
  );
};

export default HomeFormRegister;
