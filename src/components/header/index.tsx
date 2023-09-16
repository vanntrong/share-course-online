import { Header as MHeader, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import classNames from "./styles.module.scss";

const Header = () => {
  return (
    <MHeader height={60} p="md">
      <Link to={"/"} className={classNames.logo}>
        <Text size="md" weight={700}>
          TaiLieuVN
        </Text>
        <img src={"/vite.svg"} />
      </Link>
    </MHeader>
  );
};

export default Header;
