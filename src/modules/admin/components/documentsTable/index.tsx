import useGetCategories from "@/modules/categories/services/useGetCategories";
import useCreateDocument from "@/modules/documents/services/useCreateDocument";
import useDeleteDocument from "@/modules/documents/services/useDeleteDocument";
import { useInValidDocuments } from "@/modules/documents/services/useGetDocuments";
import useUpdateDocument from "@/modules/documents/services/useUpdateDocument";
import { Document } from "@/modules/documents/types";
import {
  CreateDocumentPayload,
  createDocumentValidation,
} from "@/modules/documents/validations/createDocument";
import {
  UpdateDocumentPayload,
  updateDocumentValidation,
} from "@/modules/documents/validations/updateDocument";
import { uploadFile } from "@/utils/file";
import { getAsset } from "@/utils/helper";
import { Button, Flex, Image, Select, Space } from "@mantine/core";
import React, { FC, useMemo } from "react";
import toast from "react-hot-toast";
import AdminEditDrawer from "../adminEditDrawer";
import AdminTable, { Column } from "../adminTable";

interface DocumentsTableProps {
  data?: Array<Document>;
  isLoading?: boolean;
}

const DocumentsTable: FC<DocumentsTableProps> = ({ data, isLoading }) => {
  const { data: categories } = useGetCategories();

  const categoriesSelect = useMemo(() => {
    if (!categories) return [];

    return categories.data.map((category) => ({
      label: category.name,
      value: category.id,
      description: category.summary,
    }));
  }, [categories]);

  const columns: Column<Document>[] = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        disableInEdit: true,
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        inputProps: {
          placeholder: "Title",
          withAsterisk: true,
        },
      },
      {
        title: "Summary",
        dataIndex: "summary",
        key: "summary",
        type: "textarea",
        inputProps: {
          label: "Summary",
          placeholder: "Summary",
          withAsterisk: true,
        },
      },
      {
        title: "File Path",
        dataIndex: "filePath",
        type: "file",
        key: "filePath",
        inputProps: {
          label: "File Path",
          placeholder: "File Path",
          withAsterisk: true,
        },
      },
      {
        title: "Category",
        dataIndex: "category_id",
        key: "category_id",
        renderInEdit(props) {
          return (
            <Select
              label="Category"
              placeholder="Pick one"
              data={categoriesSelect as never[]}
              searchable
              value={props.value}
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              filter={(value, item) =>
                item?.label
                  ?.toLowerCase()
                  .includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
              withAsterisk
              onChange={(value) => {
                props.onChange(Number(value));
              }}
            />
          );
        },
      },
      {
        title: "View Count",
        dataIndex: "viewCount",
        key: "viewCount",
        disableInEdit: true,
        inputProps: {
          label: "View Count",
        },
      },
      {
        title: "Download Count",
        dataIndex: "downloadCount",
        key: "downloadCount",
        disableInEdit: true,
        inputProps: {
          label: "Download Count",
        },
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        disableInEdit: true,
        inputProps: {
          label: "Type",
        },
      },
      {
        title: "Thumb",
        dataIndex: "thumb",
        render: (data) => <Image src={getAsset(data.thumb)} />,
        type: "file",
        key: "thumb",
        inputProps: {
          label: "Thumb",
          withAsterisk: true,
        },
      },
      {
        title: "Is Approved",
        dataIndex: "isApproved",
        key: "isApproved",
        type: "number",
        inputProps: {
          label: "Is Approved",
        },
      },
      {
        title: "Content",
        dataIndex: "content",
        type: "textarea",
        key: "content",
        inputProps: {
          label: "Content",
          withAsterisk: true,
        },
      },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        render: (data) => new Date(data.created_at).toLocaleDateString(),
        disableInEdit: true,
        inputProps: {
          label: "Created At",
        },
      },
    ],
    [categoriesSelect]
  );
  const [currentSelected, setCurrentSelected] = React.useState<Document | null>(
    null
  );
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);
  const invalidateQueries = useInValidDocuments();

  const { mutate } = useUpdateDocument({
    onSuccess: () => {
      setCurrentSelected(null);
      invalidateQueries();
    },
  });
  const { mutate: create } = useCreateDocument({
    onSuccess: () => {
      setCurrentSelected(null);
      invalidateQueries();
    },
  });
  const { mutate: deleteDocument } = useDeleteDocument({
    onSuccess: () => {
      setCurrentSelected(null);
      invalidateQueries();
    },
  });

  const handleSelect = (data: Document) => {
    setCurrentSelected(data);
  };

  const handleUpdate = async (data: UpdateDocumentPayload) => {
    const form = { ...data };
    form.thumb = await toast.promise(uploadFile(form.thumb), {
      loading: "Uploading...",
      success: <b>Upload success!</b>,
      error: <b>Cannot upload</b>,
    });

    form.filePath = await toast.promise(uploadFile(form.filePath), {
      loading: "Uploading...",
      success: <b>Upload success!</b>,
      error: <b>Cannot upload</b>,
    });

    form.category_id = Number(form.category_id);
    form.isApproved = Number(form.isApproved);

    mutate({ id: data.id, data: form });
  };

  const handleCreate = async (data: CreateDocumentPayload) => {
    const form = { ...data };
    form.thumb = await toast.promise(uploadFile(form.thumb), {
      loading: "Uploading...",
      success: <b>Upload success!</b>,
      error: <b>Cannot upload</b>,
    });

    form.filePath = await toast.promise(uploadFile(form.filePath), {
      loading: "Uploading...",
      success: <b>Upload success!</b>,
      error: <b>Cannot upload</b>,
    });

    form.category_id = Number(form.category_id);
    form.isApproved = Number(form.isApproved);

    create(form);
  };

  return (
    <>
      <Flex justify="flex-end">
        <Button onClick={() => setOpenCreate(true)}>Create</Button>
      </Flex>

      <Space h={10} />
      <AdminTable<Document>
        columns={columns}
        data={data}
        isLoading={isLoading}
        onUpdate={handleSelect}
        onDelete={(id) => deleteDocument({ id })}
      />
      <AdminEditDrawer
        opened={!!currentSelected}
        close={() => {
          setCurrentSelected(null);
        }}
        columns={columns}
        onSubmit={handleUpdate}
        schema={updateDocumentValidation}
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
        schema={createDocumentValidation}
      />
    </>
  );
};

export default DocumentsTable;
