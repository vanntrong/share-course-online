import { Collection } from "@/modules/collections/types";
import { Grid, Space, Title } from "@mantine/core";
import { FC } from "react";
import CollectionItem from "./collectionItem";

interface CollectionListProps {
  collections?: Array<Collection>;
}

const CollectionList: FC<CollectionListProps> = ({ collections = [] }) => {
  return (
    <>
      <Space h="lg" />
      <Title order={2} mb={"lg"}>
        Bộ sưu tập
      </Title>

      <Grid>
        {collections.map((collection) => (
          <Grid.Col span={3} key={collection.name}>
            <CollectionItem collection={collection} key={collection.id} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default CollectionList;
