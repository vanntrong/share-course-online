import Header from "@/components/header";
import useSearchDocument from "@/modules/documents/services/useSearchDocument";
import { AppShell } from "@mantine/core";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [search, setSearch] = useState<string>();
  const { data, isFetching } = useSearchDocument(
    { s: search },
    {
      enabled: !!search,
    }
  );

  return (
    <AppShell
      padding="md"
      header={
        <Header
          onSearch={(value) => setSearch(value)}
          data={data?.data}
          isLoading={isFetching}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
