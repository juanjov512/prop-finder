import { Property } from "@/gql/graphql";

export interface IPropertiesProps {
  properties: Property[];
  totalCount: number;
  loading: boolean;
  error: boolean;
  handleRetry: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}