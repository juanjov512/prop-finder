"use client";

import Filters from "@/components/filters";
import Navbar from "@/components/navbar";
import { CollapsibleProvider } from "@/contexts/CollapsibleContext";
import {
  usePropertyFilters,
  PropertyFilters,
} from "@/hooks/usePropertyFilters";
import { useProperties } from "@/hooks/useProperties";
import { useURLFilters } from "@/hooks/useURLFilters";
import { SearchOption } from "@/data/searchOptions";
import { useState, useMemo, useEffect } from "react";
import { PropertiesQueryVariables } from "@/gql/graphql";
import { DashboardContainer, MainContent, ContentWrapper } from "./styles";
import Properties from "./components/properties";
import Map from "./components/map";

const DashboardContent: React.FC = () => {
  const { filterConfigs, convertToPropertyFilters, convertToGraphQLVariables } =
    usePropertyFilters();

  const [filters, setFilters] = useState<PropertyFilters>({
    price: { min: 0, max: 1000000000 },
    types: [],
    bedrooms: 0,
    bathrooms: 0,
    location: { city: "" },
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  const graphQLVariables: PropertiesQueryVariables = useMemo(() => {
    return {
      orderBy: [
        {
          lastPublishDate: "asc",
        },
      ],
      take: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      ...convertToGraphQLVariables(filters),
    };
  }, [convertToGraphQLVariables, filters, currentPage, itemsPerPage]);

  const { properties, totalCount, loading, error, refetch } =
    useProperties(graphQLVariables);

  // Ya no necesitamos filtrar localmente porque la búsqueda se hace en GraphQL
  const filteredProperties = properties;

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const propertiesContainer = document.querySelector(
      "[data-properties-container]"
    );
    if (propertiesContainer) {
      propertiesContainer.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useURLFilters({
    filters,
    searchQuery,
    onFiltersChange: setFilters,
    onSearchChange: setSearchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        location: { city: "" },
      }));
    }
  };

  const handleSelectOption = (option: SearchOption) => {
    setSearchQuery(option.label);
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: { city: option.value },
    }));
  };

  const handleFiltersChange = (newFilters: Record<string, unknown>) => {
    const convertedFilters = convertToPropertyFilters(newFilters);
    setFilters(convertedFilters);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <CollapsibleProvider>
      <DashboardContainer>
        <Navbar onSearch={handleSearch} onSelectOption={handleSelectOption} />
        <MainContent>
          <Filters
            filters={filterConfigs}
            onFiltersChange={handleFiltersChange}
          />
          <ContentWrapper>
            <Properties
              properties={filteredProperties}
              totalCount={totalCount}
              loading={loading}
              error={Boolean(error)}
              handleRetry={handleRetry}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <Map properties={filteredProperties} />
          </ContentWrapper>
        </MainContent>
      </DashboardContainer>
    </CollapsibleProvider>
  );
};

export default DashboardContent;
