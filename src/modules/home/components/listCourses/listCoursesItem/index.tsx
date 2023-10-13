import React, { FC } from "react";

import { Document } from "@/modules/documents/types";
import { getAsset } from "@/utils/helper";
import { Box, Button, Flex, Space, Text, Title } from "@mantine/core";
import { AiOutlineCloudDownload, AiOutlineEye } from "react-icons/ai";
import classNames from "./styles.module.scss";
import DocViewer from "@/components/docViewer";
import { downloadAsset, getFileType } from "@/utils/file";
import { Link } from "react-router-dom";

interface ListCoursesItemProps {
  document: Document;
}

const ListCoursesItem: FC<ListCoursesItemProps> = ({ document }) => {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <div className={classNames.container}>
      <div className={classNames["img-container"]}>
        <img
          src={getAsset(document.thumb)}
          alt={document.title}
          className={classNames["img"]}
        />
        <Box bg={"blue"} className={classNames["text-wrapper"]}>
          <Link to={`/documents/${document.id}`}>
            <Title order={4} weight={500} color="white" size={"sm"} pl={"md"}>
              {document.title}
            </Title>
          </Link>
        </Box>
      </div>
      <Space h={"sm"} />
      <Box color="white" pb={"md"} pl={"md"} pr={"md"}>
        <Flex align={"center"} justify={"space-between"}>
          <Flex direction={"column"}>
            <Flex gap={4} align={"center"}>
              <AiOutlineCloudDownload />
              <Text color="red" size={"sm"}>
                {document.downloadCount}
              </Text>
              <Text color="gray" size={"sm"}>
                Lượt tải
              </Text>
            </Flex>
            <Flex gap={4} align={"center"}>
              <AiOutlineEye />
              <Text color="red" size={"sm"}>
                {document.viewCount}
              </Text>
              <Text color="gray" size={"sm"}>
                Lượt xem
              </Text>
            </Flex>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Button
              leftIcon={<AiOutlineEye />}
              color="blue"
              onClick={() => setIsShow(true)}
            >
              <span>Xem trước</span>
            </Button>
            <Button
              leftIcon={<AiOutlineCloudDownload />}
              color="yellow"
              onClick={() => downloadAsset(document.filePath, document.title)}
            >
              <span>Tải về</span>
            </Button>
          </Flex>
        </Flex>
      </Box>

      <DocViewer
        open={isShow}
        onClose={() => setIsShow(false)}
        docs={[
          { uri: document.filePath, fileType: getFileType(document.filePath) },
        ]}
      />
    </div>
  );
};

export default ListCoursesItem;
