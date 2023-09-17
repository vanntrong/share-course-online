import { Container, Space, Tabs } from "@mantine/core";
import { BiCategoryAlt } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import CategoriesTable from "@/modules/admin/components/categoriesTable";
import useGetCategories from "@/modules/categories/services/useGetCategories";
import DocumentsTable from "../../components/documentsTable";
import useGetDocuments from "@/modules/documents/services/useGetDocuments";

const Admin = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();
  const { data: documents, isLoading: isLoadingDocuments } = useGetDocuments();

  return (
    <Container size={1440} mt={100}>
      <Tabs defaultValue="categories" variant="pills">
        <Tabs.List>
          <Tabs.Tab value="categories" icon={<BiCategoryAlt size="0.8rem" />}>
            Categories
          </Tabs.Tab>
          <Tabs.Tab value="documents" icon={<GrDocumentPdf size="0.8rem" />}>
            Documents
          </Tabs.Tab>
        </Tabs.List>
        <Space h={30} />
        <Tabs.Panel value="categories" pt="xs">
          <CategoriesTable
            data={categories?.data}
            isLoading={isLoadingCategories}
          />
        </Tabs.Panel>

        <Tabs.Panel value="documents" pt="xs">
          <DocumentsTable
            data={documents?.data}
            isLoading={isLoadingDocuments}
          />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Admin;
