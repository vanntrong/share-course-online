import { Container, Grid, Image, Space } from "@mantine/core";
import classNames from "./styles.module.scss";
import HomeSlider from "../../components/homeSlider";
import HomeFormLogin from "../../components/homeFormLogin";
import ListCourses from "../../components/listCourses";
import useGetCategories from "@/modules/categories/services/useGetCategories";
import useLogin from "@/modules/auth/services/useLogin";
import { useAuthContext } from "@/providers/authProvider";
import HomeUserInfo from "../../components/homeUserInfo";

const Home = () => {
  const { data } = useGetCategories();
  const { user } = useAuthContext();
  const { mutate, isLoading } = useLogin();

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
            {user ? (
              <HomeUserInfo user={user} />
            ) : (
              <HomeFormLogin onSubmit={mutate} isLoading={isLoading} />
            )}
          </Grid.Col>
        </Grid>

        {data?.data?.map((category) => (
          <>
            <Space h="lg" />
            <ListCourses
              title={category.name}
              id={category.id}
              documents={category.documents || []}
              key={category.id}
            />
          </>
        ))}
      </Container>
    </section>
  );
};

export default Home;
