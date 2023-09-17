import { useInValidDocuments } from "@/modules/documents/services/useGetDocuments";
import useUpdateDocument from "@/modules/documents/services/useUpdateDocument";
import { Document } from "@/modules/documents/types";
import {
  UpdateDocumentPayload,
  updateDocumentValidation,
} from "@/modules/documents/validations/updateDocument";
import React, { FC } from "react";
import AdminEditDrawer from "../adminEditDrawer";
import AdminTable, { Column } from "../adminTable";
import { getFormData } from "@/utils/form";
import { Button, Flex, Image, Space } from "@mantine/core";
import { getAsset } from "@/utils/helper";
import useDeleteDocument from "@/modules/documents/services/useDeleteDocument";
import {
  CreateDocumentPayload,
  createDocumentValidation,
} from "@/modules/documents/validations/createDocument";
import useCreateDocument from "@/modules/documents/services/useCreateDocument";

interface DocumentsTableProps {
  data?: Array<Document>;
  isLoading?: boolean;
}

const DocumentsTable: FC<DocumentsTableProps> = ({ data, isLoading }) => {
  const columns: Column<Document>[] = [
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
      },
    },
    {
      title: "Is Approved",
      dataIndex: "isApproved",
      key: "isApproved",
      inputProps: {
        label: "Is Approved",
        type: "number",
      },
    },
    {
      title: "Content",
      dataIndex: "content",
      type: "textarea",
      key: "content",
      inputProps: {
        label: "Content",
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
  ];
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

  const handleUpdate = (data: UpdateDocumentPayload) => {
    const dataFormData = getFormData(data);

    if (typeof dataFormData.get("thumb") === "string") {
      dataFormData.delete("thumb");
    }

    if (typeof dataFormData.get("filePath") === "string") {
      dataFormData.delete("filePath");
    }

    mutate({ id: data.id, data: dataFormData });
  };

  const handleCreate = (data: CreateDocumentPayload) => {
    const dataFormData = getFormData(data);

    create(dataFormData);
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
