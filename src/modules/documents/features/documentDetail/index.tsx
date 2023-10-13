import { downloadAsset, getFileType } from "@/utils/file";
import BaseDocViewer, {
  DocViewerRenderers,
  IDocument,
} from "@cyntler/react-doc-viewer";
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
import { memo, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DocumentComment from "../../components/documentComment";
import DocumentStat from "../../components/documentStat";
import useGetCommentDocument from "../../services/useGetCommentDocument";
import useGetDocument from "../../services/useGetDocument";
import useGetRelatedDocuments from "../../services/useGetRelatedDocuments";
import classNames from "./styles.module.scss";

const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: { data } = {} } = useGetDocument(id, {
    enabled: !!id,
  });
  const { data: comments, refetch } = useGetCommentDocument(Number(id), {
    enabled: !!id,
  });

  const { data: relatedDocuments } = useGetRelatedDocuments(id, {
    enabled: !!id,
  });
  const docs = useMemo(() => {
    if (!data) return [];
    return [
      {
        uri: data.filePath,
        fileType: getFileType(data.filePath),
      },
    ];
  }, [data]);

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
        <Flex gap={"lg"} h={"80vh"}>
          <DocView docs={docs} />
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

      <Box mt={"lg"}>
        <Title order={4}>Bình luận</Title>

        <DocumentComment
          reviews={comments?.data}
          documentId={data?.id}
          refetch={refetch}
        />
      </Box>
    </Container>
  );
};

export default DocumentDetail;

const DocView = memo(({ docs }: { docs: IDocument[] }) => {
  return (
    <BaseDocViewer
      pluginRenderers={DocViewerRenderers}
      documents={docs}
      config={{
        header: {
          disableHeader: true,
        },
      }}
    />
  );
});
