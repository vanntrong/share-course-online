import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./configs/appConfig";
import { router } from "./configs/routesConfig";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/authProvider";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <div>
          <Toaster />
        </div>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
