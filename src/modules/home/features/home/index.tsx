import { Container, Grid, Image, Space } from "@mantine/core";
import classNames from "./styles.module.scss";
import HomeSlider from "../../components/homeSlider";
import HomeFormLogin from "../../components/homeFormLogin";
import ListCourses from "../../components/listCourses";

const Home = () => {
  return (
    <section>
      <div>
        <Image
          src="/images/home/top-banner.jpeg"
          alt=""
          fit="cover"
          className={classNames["top-banner"]}
        />
      </div>

      <Container size={1440} mt={"lg"}>
        <Grid>
          <Grid.Col span={8}>
            <HomeSlider />
          </Grid.Col>
          <Grid.Col span={4}>
            <HomeFormLogin />
          </Grid.Col>
        </Grid>

        <Space h="lg" />

        <ListCourses title="Bộ tài liệu nổi bật" slug="bo-tai-lieu-noi-bat" />

        <Space h={100} />

        <ListCourses title="Bộ sưu tập nổi bật" slug="bo-suu-tap-noi-bat" />

        <Space h={100} />

        <ListCourses title="Bộ sưu tập mới" slug="bo-suu-tap-moi" />

        <Space h={100} />

        <ListCourses title="Tài liệu mới" slug="tai-lieu-moi" />
      </Container>
    </section>
  );
};

export default Home;
