import { FC } from "react";

import { getAsset } from "@/utils/helper";
import { Box, Space, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Collection } from "../../types";
import classNames from "./styles.module.scss";

interface CollectionItemProps {
  collection: Collection;
}

const CollectionItem: FC<CollectionItemProps> = ({ collection }) => {
  return (
    <div className={classNames.container}>
      <div className={classNames["img-container"]}>
        <img
          src={getAsset(collection.thumb)}
          alt={collection.name}
          className={classNames["img"]}
        />
        <Box bg={"blue"} className={classNames["text-wrapper"]}>
          <Link to={`/collections/${collection.id}`}>
            <Title order={4} weight={500} color="white" size={"sm"} pl={"md"}>
              {collection.name}
            </Title>
          </Link>
        </Box>
      </div>
      <Space h={"sm"} />
    </div>
  );
};

export default CollectionItem;
