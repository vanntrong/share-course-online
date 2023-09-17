import { downloadAsset } from "@/utils/file";
import BaseDocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import DocumentStat from "../../components/documentStat";
import useGetDocument from "../../services/useGetDocument";
import useGetRelatedDocuments from "../../services/useGetRelatedDocuments";
import classNames from "./styles.module.scss";

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: { data } = {} } = useGetDocument(id, {
    enabled: !!id,
  });

  const { data: relatedDocuments } = useGetRelatedDocuments(id, {
    enabled: !!id,
  });

  const docs = data
    ? [
        {
          uri: data?.filePath,
        },
      ]
    : [];

  return (
    <Container size={1440} mt={"lg"}>
      <Title order={2}>{data?.title}</Title>
      <Flex justify={"flex-end"}>
        <Button
          color="yellow"
          onClick={() => {
            if (!data) return;
            downloadAsset(data?.filePath, data?.title);
          }}
        >
          <span>Tải xuống</span>
        </Button>
      </Flex>
      <Box mt={"lg"}>
        <Flex gap={"lg"}>
          <BaseDocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            style={{
              height: "80vh",
            }}
            config={{
              header: {
                disableHeader: true,
              },
            }}
          />
          <Box
            style={{
              flexShrink: 0,
            }}
          >
            <Title order={4}>Tài liệu liên quan</Title>
            <Stack mt={"lg"}>
              {relatedDocuments?.data?.map((item) => (
                <Link to={`/documents/${item.id}`} className={classNames.link}>
                  <Box key={`related-${item.id}`}>
                    <Flex align={"center"} gap={"md"}>
                      <Avatar src={item.thumb} size={"lg"} />
                      <Flex direction={"column"}>
                        <Text>{item.title}</Text>
                        <DocumentStat
                          viewCount={item.viewCount}
                          downloadCount={item.downloadCount}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </Link>
              ))}
            </Stack>
          </Box>
        </Flex>
      </Box>

      <Box mt={"lg"}>
        <Title order={4}>Mô tả</Title>
        <Text>{data?.content}</Text>
      </Box>
    </Container>
  );
};

export default DocumentDetail;
