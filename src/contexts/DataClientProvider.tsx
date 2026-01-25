import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const DataClientProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 120000, gcTime: 12000, retry: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default DataClientProvider;
