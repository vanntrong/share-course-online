import { Button, Flex, Grid, Space, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import ListCoursesItem from "./listCoursesItem";
import { Document } from "@/modules/documents/types";

interface ListCoursesProps {
  title: string;
  id: number;
  documents: Array<Document>;
}

const ListCourses: FC<ListCoursesProps> = ({ title, id, documents }) => {
  return (
    <div>
      <Flex justify="space-between" align="center">
        <Title order={3} weight={500} color="indigo">
          {title}
        </Title>
        <Link to={`/categories/${id}`}>
          <Button variant="outline">
            <span>Xem thêm</span>
          </Button>
        </Link>
      </Flex>

      <Space h={"sm"} />

      <Grid>
        {documents.slice(0, 4).map((document) => (
          <Grid.Col span={3} key={document.title}>
            <ListCoursesItem document={document} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default ListCourses;
