import ListCoursesItem from "@/modules/home/components/listCourses/listCoursesItem";
import { Container, Grid, Space, Title } from "@mantine/core";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetCollection from "../../services/useGetCollection";

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: { data } = {} } = useGetCollection(Number(id), {
    enabled: !!id,
  });

  const documents = useMemo(() => {
    if (!data) return [];

    return data.details.map((item) => item.document);
  }, [data]);

  return (
    <Container size={1440} mt={"lg"}>
      <Title order={2} align="center">
        {data?.name}
      </Title>

      <Space h={"xl"} />

      <Title order={3} align="left">
        Tài liệu trong bộ sưu tập
      </Title>
      <Space h={"lg"} />
      <Grid>
        {documents.map((document) => (
          <Grid.Col span={3} key={document.title}>
            <ListCoursesItem document={document} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default CollectionDetail;
