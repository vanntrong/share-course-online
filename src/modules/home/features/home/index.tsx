import useGetCategories from "@/modules/categories/services/useGetCategories";
import { useAuthContext } from "@/providers/authProvider";
import { Container, Grid, Image, Space } from "@mantine/core";
import HomeAuth from "../../components/homeAuth";
import HomeSlider from "../../components/homeSlider";
import HomeUserInfo from "../../components/homeUserInfo";
import ListCourses from "../../components/listCourses";
import classNames from "./styles.module.scss";
import useGetCollections from "@/modules/collections/services/useGetCollections";
import CollectionList from "../../../collections/collectionList";

const Home = () => {
  const { data } = useGetCategories();
  const { data: collectionsData } = useGetCollections();
  const { user } = useAuthContext();

  console.log(collectionsData);

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
            {user ? <HomeUserInfo user={user} /> : <HomeAuth />}
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

        <CollectionList collections={collectionsData?.data} />
      </Container>
    </section>
  );
};

export default Home;
