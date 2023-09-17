import React, { FC } from "react";
import AdminTable, { Column } from "../adminTable";
import useUpdateCategory from "@/modules/categories/services/useUpdateCategory";
import AdminEditDrawer from "../adminEditDrawer";
import { updateCategoriesValidation } from "@/modules/categories/validations/updateCategories";
import { useInValidCategories } from "@/modules/categories/services/useGetCategories";
import { Category } from "@/modules/categories/types";
import { Button, Flex, Space } from "@mantine/core";
import { createCategoryValidation } from "@/modules/categories/validations/createCategory";
import useCreateCategory from "@/modules/categories/services/useCreateCategory";
import useDeleteCategory from "@/modules/categories/services/useDeleteCategory";

interface CategoriesTableProps {
  data?: Array<Category>;
  isLoading?: boolean;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ data, isLoading }) => {
  const columns: Column<Category>[] = [
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
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      inputProps: {
        placeholder: "Icon",
      },
    },
  ];
  const [currentSelected, setCurrentSelected] = React.useState<Category | null>(
    null
  );
  const [openCreate, setOpenCreate] = React.useState<boolean>(false);

  const invalidateQueries = useInValidCategories();

  const { mutate: update } = useUpdateCategory({
    onSuccess: () => {
      setCurrentSelected(null);
      invalidateQueries();
    },
  });
  const { mutate: create } = useCreateCategory({
    onSuccess: () => {
      setOpenCreate(false);
      invalidateQueries();
    },
  });

  const { mutate: deleteCategory } = useDeleteCategory({
    onSuccess: () => {
      invalidateQueries();
    },
  });

  const handleUpdate = (data: Category) => {
    setCurrentSelected(data);
  };

  return (
    <>
      <Flex justify="flex-end">
        <Button onClick={() => setOpenCreate(true)}>Create</Button>
      </Flex>

      <Space h={10} />

      <AdminTable<Category>
        columns={columns}
        data={data}
        isLoading={isLoading}
        onUpdate={handleUpdate}
        onDelete={(id) => deleteCategory({ id })}
      />
      <AdminEditDrawer
        opened={!!currentSelected}
        close={() => {
          setCurrentSelected(null);
        }}
        columns={columns}
        onSubmit={update}
        schema={updateCategoriesValidation}
        data={currentSelected}
      />
      <AdminEditDrawer
        opened={openCreate}
        close={() => {
          setOpenCreate(false);
        }}
        columns={columns}
        onSubmit={create}
        resetOnClose
        schema={createCategoryValidation}
      />
    </>
  );
};

export default CategoriesTable;
