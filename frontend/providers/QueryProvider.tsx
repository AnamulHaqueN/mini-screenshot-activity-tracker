"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minute
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        // maxPages: 20,
        // TODO: must have remove the retry configuration before the production deploy
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    /**
      Browser: make a new query client if we don't already have one
      This is very important, so we don't re-make a new client if React
      suspends during the initial render. This may not be needed if we
      have a suspense boundary BELOW the creation of the query client
    */
    if (!browserQueryClient) browserQueryClient = createQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
