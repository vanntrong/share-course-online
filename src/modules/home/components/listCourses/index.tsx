import { Button, Flex, Grid, Space, Title } from "@mantine/core";
import { FC } from "react";
import ListCoursesItem from "./listCoursesItem";
import { homeCourses } from "../../configs";
import { Link } from "react-router-dom";

interface ListCoursesProps {
  title: string;
  slug: string;
}

const ListCourses: FC<ListCoursesProps> = ({ title, slug }) => {
  return (
    <div>
      <Flex justify="space-between" align="center">
        <Title order={3} weight={500} color="indigo">
          {title}
        </Title>
        <Link to={`/courses/${slug}`}>
          <Button variant="outline">
            <span>Xem thêm</span>
          </Button>
        </Link>
      </Flex>

      <Space h={"sm"} />

      <Grid>
        {homeCourses.map((course) => (
          <Grid.Col span={3} key={course.title}>
            <ListCoursesItem course={course} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default ListCourses;
