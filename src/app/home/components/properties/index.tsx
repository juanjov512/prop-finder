import PropertyCard from "@/components/property-card";
import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from "@/components/ui/loading-states";
import {
  PropertiesContainer,
  PropertiesList,
  PaginationWrapper,
} from "./styles";
import PropertiesCount from "@/components/properties-count";
import { Property } from "@/gql/graphql";
import { Pagination } from "@/components/ui/pagination";
import type { IPropertiesProps } from "./types";

const Properties: React.FC<IPropertiesProps> = ({
  properties,
  totalCount,
  loading,
  error,
  handleRetry,
  currentPage,
  totalPages,
  onPageChange,
}: IPropertiesProps) => {
  const renderPropertyCard = (property: Property, index: number) => {
    return <PropertyCard key={`${property.id}-${index}`} {...property} />;
  };

  return (
    <PropertiesContainer data-properties-container>
      {!loading && !error && properties.length > 0 && (
        <PropertiesCount
          filteredProperties={properties.length * currentPage}
          totalCount={totalCount}
        />
      )}

      {loading && <LoadingSpinner text="Cargando propiedades..." />}

      {Boolean(error) && (
        <ErrorState
          title="Error al cargar las propiedades"
          message="Ha ocurrido un error inesperado. Por favor, intenta de nuevo."
          onRetry={handleRetry}
        />
      )}

      {!loading && !error && properties.length === 0 && (
        <EmptyState
          title="No se encontraron propiedades"
          message="No hay propiedades que coincidan con los filtros seleccionados."
        />
      )}

      {!loading && !error && properties.length > 0 && (
        <PropertiesList>
          {properties.map((property: Property, index: number) =>
            renderPropertyCard(property, index)
          )}
        </PropertiesList>
      )}

      {!loading && !error && totalPages > 1 && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </PaginationWrapper>
      )}
    </PropertiesContainer>
  );
};

export default Properties;
