import useAddDocumentToCollection from "@/modules/collections/services/useAddDocumentToCollection";
import useCreateCollection from "@/modules/collections/services/useCreateCollection";
import useDeleteCollection from "@/modules/collections/services/useDeleteCollection";
import useDeleteDocumentFromCollection from "@/modules/collections/services/useDeleteDocumentFromCollection";
import useUpdateCollection from "@/modules/collections/services/useUpdateCollection";
import { Collection } from "@/modules/collections/types";
import {
  CreateCollectionPayload,
  createCollectionValidation,
} from "@/modules/collections/validations/createCollection";
import {
  UpdateCollectionPayload,
  updateCollectionValidation,
} from "@/modules/collections/validations/updateCollection";
import useGetDocuments from "@/modules/documents/services/useGetDocuments";
import { uploadFile } from "@/utils/file";
import { getAsset } from "@/utils/helper";
import {
  Button,
  Chip,
  Flex,
  Image,
  MultiSelect,
  ScrollArea,
  Space,
} from "@mantine/core";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import AdminEditDrawer from "../adminEditDrawer";
import AdminTable, { Column } from "../adminTable";

interface CollectionsTableProps {
  data?: Array<Collection>;
  isLoading?: boolean;
  refetch: () => void;
}

const CollectionsTable: FC<CollectionsTableProps> = ({
  data,
  isLoading,
  refetch,
}) => {
  const { data: documents } = useGetDocuments();

  const [currentSelected, setCurrentSelected] =
    React.useState<Collection | null>(null);

  const documentsSelect = useMemo(() => {
    if (!documents) return [];

    return documents.data.map((document) => ({
      label: document.title,
      value: document.id.toString(),
    }));
  }, [documents]);

  const [selectedDocuments, setSelectedDocuments] = React.useState<
    Array<string>
  >(currentSelected?.details.map((item) => item.document.id.toString()) || []);

  useEffect(() => {
    if (!currentSelected) {
      setSelectedDocuments([]);
      return;
    }

    setSelectedDocuments(
      currentSelected.details.map((item) => item.document.id.toString())
    );
  }, [currentSelected]);

  const columns: Column<Collection>[] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        disableInEdit: true,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        inputProps: {
          placeholder: "Name",
          withAsterisk: true,
        },
      },
      {
        title: "Documents",
        dataIndex: "documents",
        key: "documents",
        render: (data) => {
          return (
            <ScrollArea maw={400}>
              <Flex w={"100%"} wrap={"wrap"} gap={"sm"} direction={"row"}>
                {data.details.map((item) => (
                  <Chip color="indigo" variant="filled" checked={true}>
                    {item.document.title}
                  </Chip>
                ))}
              </Flex>
            </ScrollArea>
          );
        },
        renderInEdit() {
          return (
            <MultiSelect
              label="Documents"
              placeholder="Select documents"
              data={documentsSelect as never[]}
              searchable
              disableSelectedItemFiltering
              value={selectedDocuments}
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              withAsterisk
              onChange={(value) => {
                setSelectedDocuments(value);
              }}
            />
          );
        },
      },
      {
        title: "Thumb",
        dataIndex: "thumb",
        render: (data) => (
          <Image src={getAsset(data.thumb)} width={"100%"} height={150} />
        ),
        type: "file",
        key: "thumb",
        inputProps: {
          label: "Thumb",
          withAsterisk: true,
        },
      },
    ],
    [documentsSelect, selectedDocuments]
  );

  const [openCreate, setOpenCreate] = React.useState<boolean>(false);

  const { mutate } = useUpdateCollection({
    onSuccess: () => {
      setCurrentSelected(null);
      refetch();
    },
  });
  const { mutate: create } = useCreateCollection({
    onSuccess: () => {
      setCurrentSelected(null);
    },
  });
  const { mutate: deleteCollection } = useDeleteCollection({
    onSuccess: () => {
      setCurrentSelected(null);
      refetch();
    },
  });

  const { mutate: addDocument } = useAddDocumentToCollection();
  const { mutate: deleteDocument } = useDeleteDocumentFromCollection();

  const handleSelect = (data: Collection) => {
    setCurrentSelected(data);
  };

  const handleAddDocument = useCallback(
    async (documentIds: string[], id?: number) => {
      if (!currentSelected && !id) return;
      return Promise.all(
        documentIds.map((documentId) =>
          addDocument({
            id: id || (currentSelected?.id as number),
            data: { document_id: Number(documentId) },
          })
        )
      );
    },
    [currentSelected, addDocument]
  );

  const handleDeleteDocument = useCallback(
    async (documentIds: string[]) => {
      const detailListIds =
        currentSelected?.details.filter((item) =>
          documentIds.includes(item.document.id.toString())
        ) || [];

      return Promise.all(
        detailListIds.map((item) =>
          deleteDocument({
            id: item.id,
          })
        )
      );
    },
    [deleteDocument, currentSelected]
  );

  const getListAddAndDelete = useCallback(
    (ids: string[]) => {
      const listAdd: string[] = [];
      const listDelete: string[] = [];
      const documentList =
        currentSelected?.details.map((item) => item.document.id.toString()) ||
        [];

      const documentMap = new Map<string, boolean>(
        documentList.map((item) => [item, true])
      );
      const idsMap = new Map<string, boolean>(ids.map((item) => [item, true]));

      for (const id of [...ids, ...documentList]) {
        if (!documentMap.has(id)) {
          listAdd.push(id);
          continue;
        }
        if (!idsMap.has(id)) {
          listDelete.push(id);
          continue;
        }
      }

      return [listAdd, listDelete];
    },
    [currentSelected]
  );

  const handleUpdate = async (data: UpdateCollectionPayload) => {
    const form = { ...data };
    form.thumb = await toast.promise(uploadFile(form.thumb), {
      loading: "Uploading...",
      success: <b>Upload success!</b>,
      error: <b>Cannot upload</b>,
    });

    const [listAdd, listDelete] = getListAddAndDelete(selectedDocuments);

    await Promise.all([
      handleAddDocument(listAdd),
      handleDeleteDocument(listDelete),
    ]);

    mutate({ id: data.id, data: form });
  };

  const handleCreate = async (data: CreateCollectionPayload) => {
    const form = { ...data };
    form.thumb = await toast.promise(uploadFile(form.thumb), {
      loading: "Uploading...",
      success: <b>Upload success!</b>,
      error: <b>Cannot upload</b>,
    });

    const [listAdd] = getListAddAndDelete(selectedDocuments);

    create(form, {
      async onSuccess(data) {
        await handleAddDocument(listAdd, data.data.id);
        refetch();
      },
    });
  };

  return (
    <>
      <Flex justify="flex-end">
        <Button onClick={() => setOpenCreate(true)}>Create</Button>
      </Flex>

      <Space h={10} />
      <AdminTable<Collection>
        columns={columns}
        data={data}
        isLoading={isLoading}
        onUpdate={handleSelect}
        onDelete={(id) => deleteCollection({ id })}
      />
      <AdminEditDrawer<Collection>
        opened={!!currentSelected}
        close={() => {
          setCurrentSelected(null);
        }}
        columns={columns}
        onSubmit={handleUpdate}
        schema={updateCollectionValidation}
        data={currentSelected}
      />
      <AdminEditDrawer
        opened={openCreate}
        close={() => {
          setOpenCreate(false);
        }}
        columns={columns}
        onSubmit={handleCreate}
        resetOnClose
        schema={createCollectionValidation}
      />
    </>
  );
};

export default CollectionsTable;
