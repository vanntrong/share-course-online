/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Popover, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import React, { FC } from "react";

interface DeleteButtonProps {
  onConfirm?: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onConfirm }) => {
  const [opened, setOpened] = React.useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const handleClick = () => {
    setOpened(false);
    onConfirm?.();
  };

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Button variant="outline" color="red" onClick={() => setOpened(true)}>
          Delete
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <div style={{}} ref={ref}>
          <Text
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            Are you sure you want to delete it?
          </Text>
          <Flex justify={"flex-end"} gap={"md"} mt={"md"}>
            <Button
              variant="outline"
              color="blue"
              size="xs"
              onClick={handleClick}
            >
              Yes
            </Button>
            <Button
              variant="outline"
              color="red"
              size="xs"
              onClick={() => setOpened(false)}
            >
              No
            </Button>
          </Flex>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeleteButton;
