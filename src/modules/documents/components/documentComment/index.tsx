import {
  Button,
  Flex,
  Textarea,
  Box,
  Title,
  Text,
  Divider,
  Modal,
} from "@mantine/core";
import { isEmpty, isNil } from "lodash";
import { useState, FC } from "react";
import { Review } from "../../types";
import useCommentDocument from "../../services/useCommentDocument";
import { useAuthContext } from "@/providers/authProvider";
import { useCallback } from "react";
import HomeAuth from "@/modules/home/components/homeAuth";

interface DocumentCommentProps {
  reviews?: Array<Review>;
  documentId?: number;
  refetch: () => void;
}

const DocumentComment: FC<DocumentCommentProps> = ({
  reviews,
  documentId,
  refetch,
}) => {
  const [textComment, setTextComment] = useState<string>("");
  const { user } = useAuthContext();
  const { mutate } = useCommentDocument({
    onSuccess: () => refetch(),
  });
  const [isShowModalLogin, setIsShowModalLogin] = useState<boolean>(false);

  const handleComment = useCallback(
    (content: string) => {
      if (!documentId || !user) return;

      mutate({
        id: documentId,
        content,
        name: user?.firstName + " " + user?.lastName,
      });
    },
    [documentId, user, mutate]
  );

  const handleSubmit = () => {
    handleComment(textComment);
    setTextComment("");
  };

  return (
    <>
      {user ? (
        <>
          <Textarea
            mt={"xs"}
            placeholder="Để lại bình luận của bạn về tài liệu này"
            value={textComment}
            onChange={(event) => setTextComment(event.currentTarget.value)}
          />
          <Flex mt={"xs"} justify={"flex-end"}>
            <Button
              disabled={isEmpty(textComment) || isNil(textComment)}
              onClick={handleSubmit}
            >
              <span>Gửi</span>
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Text size={"sm"} mt={"sm"}>
            Đăng nhập để bình luận
          </Text>

          <Button mt={"sm"} onClick={() => setIsShowModalLogin(true)}>
            <span>Đăng nhập</span>
          </Button>

          <Modal
            onClose={() => setIsShowModalLogin(false)}
            opened={isShowModalLogin}
            title="Đăng nhập hoặc đăng ký"
            centered
          >
            <HomeAuth />
          </Modal>
        </>
      )}

      <Divider my={"xl"} />

      <Flex mt={"xs"} direction={"column"} gap={"sm"}>
        {reviews?.map((review) => (
          <Box key={review.id} w={"100%"}>
            <Flex>
              <Title order={6} style={{ flexBasis: "120px" }}>
                {review.name}:
              </Title>
              <Text size={"md"}>{review.content}</Text>
            </Flex>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default DocumentComment;
