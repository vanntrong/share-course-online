import ListCoursesItem from "@/modules/home/components/listCourses/listCoursesItem";
import { homeCourses } from "@/modules/home/configs";
import { Container, Grid, Title } from "@mantine/core";

const CourseList = () => {
  return (
    <Container size={1440} mt={50}>
      <Title order={3} weight={500} color="indigo" align="center">
        CourseList title
      </Title>

      <Grid mt={50}>
        {[...homeCourses, ...homeCourses, ...homeCourses].map((course) => (
          <Grid.Col span={3} key={course.title}>
            <ListCoursesItem course={course} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;
