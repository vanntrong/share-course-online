import { Flex, Text } from "@mantine/core";
import { FC } from "react";
import { AiOutlineCloudDownload, AiOutlineEye } from "react-icons/ai";

interface DocumentStatProps {
  viewCount: number;
  downloadCount: number;
}

const DocumentStat: FC<DocumentStatProps> = ({ viewCount, downloadCount }) => {
  return (
    <Flex align={"center"} gap={"md"}>
      <Flex align={"center"} gap={4}>
        <AiOutlineEye />
        <Text size={"sm"}>{viewCount}</Text>
      </Flex>
      <Flex align={"center"} gap={4}>
        <AiOutlineCloudDownload />
        <Text size={"sm"}>{downloadCount}</Text>
      </Flex>
    </Flex>
  );
};

export default DocumentStat;
