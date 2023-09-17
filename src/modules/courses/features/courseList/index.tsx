import useGetCategory from "@/modules/categories/services/useGetCategory";
import ListCoursesItem from "@/modules/home/components/listCourses/listCoursesItem";
import { Container, Grid, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const CourseList = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetCategory(Number(id));
  return (
    <Container size={1440} mt={50}>
      <Title order={3} weight={500} color="indigo" align="center">
        {data?.data.name}
      </Title>

      <Grid mt={50}>
        {data?.data.documents?.map((document) => (
          <Grid.Col span={3} key={document.title}>
            <ListCoursesItem document={document} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
