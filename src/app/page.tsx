"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";
import DashboardContent from "./home/page";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <DashboardContent />
    </ApolloProvider>
  );
}
