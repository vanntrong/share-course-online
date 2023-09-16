import Header from "@/components/header";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <AppShell padding="md" header={<Header />}>
      <Outlet />
    </AppShell>
  );
};

export default MainLayout;
