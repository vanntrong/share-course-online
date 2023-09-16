import {
  Button,
  Checkbox,
  Container,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import classNames from "./styles.module.scss";

const HomeFormLogin = () => {
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
        <TextInput placeholder="Email" label="Email" withAsterisk />
        <Space h="sm" />
        <TextInput
          placeholder="Mật khẩu"
          label="Mật khẩu"
          withAsterisk
          type="password"
        />
        <Space h="sm" />
        <Checkbox
          label="Tôi đồng ý với thoả thuận sử dụng của TaiLieuVN"
          required
        />
        <Space h="sm" />
        <Button fullWidth disabled>
          <span>Đăng nhập</span>
        </Button>
      </div>
    </Container>
  );
};

export default HomeFormLogin;
