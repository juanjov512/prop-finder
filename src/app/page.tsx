"use client";

import { ApolloProvider } from "@apollo/client";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { client } from "@/lib/apollo";

// Import the component directly without creating a route
const DashboardContent = dynamic(() => import("./home"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </ApolloProvider>
  );
}
