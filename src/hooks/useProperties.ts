import { useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '@/app/home/queries';
import { Property, PropertiesQueryVariables } from '@/gql/graphql';
import { useMemo } from 'react';

export const useProperties = (variables: PropertiesQueryVariables) => {
  const { data, loading, error, refetch } = useQuery(GET_PROPERTIES, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const properties: Property[] = data?.properties || [];
  const totalCount = data?.propertiesCount || 0;

  // Función para buscar propiedades por texto
  const searchProperties = useMemo(() => {
    return (properties: Property[], searchQuery: string): Property[] => {
      if (!searchQuery.trim()) return properties;
      
      const query = searchQuery.toLowerCase();
      return properties.filter(property => 
        property.title?.toLowerCase().includes(query) ||
        property.type?.toLowerCase().includes(query) ||
        property.objective?.toLowerCase().includes(query) ||
        property.price?.toString().includes(query) ||
        property.location?.city?.toLowerCase().includes(query) ||
        property.location?.state?.toLowerCase().includes(query)
      );
    };
  }, []);

  return {
    properties,
    totalCount,
    loading,
    error,
    refetch,
    searchProperties,
  };
}; 