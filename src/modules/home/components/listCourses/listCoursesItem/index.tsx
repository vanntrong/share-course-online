import { FC } from "react";

import { Course } from "@/modules/home/types";
import { Box, Button, Flex, Space, Text, Title } from "@mantine/core";
import classNames from "./styles.module.scss";
import { AiOutlineCloudDownload } from "react-icons/ai";

interface ListCoursesItemProps {
  course: Course;
}

const ListCoursesItem: FC<ListCoursesItemProps> = ({ course }) => {
  return (
    <div className={classNames.container}>
      <div className={classNames["img-container"]}>
        <img src={course.src} alt={course.alt} className={classNames["img"]} />
        <Box bg={"blue"} className={classNames["text-wrapper"]}>
          <Title order={4} weight={500} color="white" size={"sm"} pl={"md"}>
            {course.title}
          </Title>
        </Box>
      </div>
      <Space h={"sm"} />
      <Box color="white" pb={"md"} pl={"md"} pr={"md"}>
        <Flex align={"center"} justify={"space-between"}>
          <Flex gap={4} align={"center"}>
            <AiOutlineCloudDownload />
            <Text color="red" size={"sm"}>
              {course.downLoadTimes}
            </Text>
            <Text color="gray" size={"sm"}>
              Lượt tải
            </Text>
          </Flex>
          <Button leftIcon={<AiOutlineCloudDownload />} color="yellow">
            <span>Tải về</span>
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default ListCoursesItem;
