import useDebounceValue from "@/hooks/useDebounceValue";
import { Document } from "@/modules/documents/types";
import {
  Avatar,
  Box,
  Flex,
  Loader,
  Popover,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import classNames from "./style.module.scss";

interface SearchInputProps {
  onSearch: (value: string) => void;
  data?: Document[];
  isLoading?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch, data, isLoading }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");

  const debounceValue = useDebounceValue(value);

  useEffect(() => {
    onSearch(debounceValue);
  }, [debounceValue, onSearch]);
  return (
    <Box w={340}>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: "pop" }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <TextInput
              icon={<AiOutlineSearch />}
              placeholder="Tìm kiếm tài liệu"
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              rightSection={isLoading ? <Loader size="xs" /> : null}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack spacing="xs">
            {data?.map((item) => (
              <Link
                key={item.title}
                to={`/documents/${item.id}`}
                className={classNames.card}
              >
                <Box className={classNames["card-container"]}>
                  <Flex align={"center"} gap={"md"}>
                    <Avatar src={item.thumb} />
                    <Text
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {item.title}
                    </Text>
                  </Flex>
                </Box>
              </Link>
            ))}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};

export default SearchInput;
