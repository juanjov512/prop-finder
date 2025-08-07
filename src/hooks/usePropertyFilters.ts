import { useMemo } from 'react';
import { Property } from '@/gql/graphql';
import { IFilterConfig } from '@/components/filters/types';

export interface PropertyFilters {
  price?: {
    min: number;
    max: number;
  };
  types?: string[];
  bedrooms?: number;
  bathrooms?: number;
  location?: {
    city?: string;
  };
}

// Deberia traer los tipos basado en un enum de la api
export type TPropertyType = "Casa" | "Apartamento" | "Oficina" | "LocalComercial" | "Lote";

export const usePropertyFilters = () => {
  const propertyTypes: Record<TPropertyType, string> = useMemo(() => ({
    Casa: "Casa",
    Apartamento: "Apartamento",
    Oficina: "Oficina",
    LocalComercial: "Local Comercial",
    Lote: "Lote",
  }), []);
  
  // Configuración de filtros para propiedades
  const filterConfigs: IFilterConfig[] = useMemo(
    () => [
      {
        id: "price",
        type: "range",
        label: "Rango de precio",
        min: 0,
        max: 1000000000,
        defaultValue: { min: 0, max: 1000000000 },
      },
      {
        id: "types",
        type: "checkbox",
        label: "Tipo de propiedad",
        options: Object.entries(propertyTypes).map(([value, label]) => ({ label, value })),
        defaultValue: [],
      },
      {
        id: "bedrooms",
        type: "select",
        label: "Habitaciones",
        options: [
          { value: "0", label: "Seleccionar" },
          { value: "1", label: "1+" },
          { value: "2", label: "2+" },
          { value: "3", label: "3+" },
          { value: "4", label: "4+" },
        ],
        defaultValue: "0",
      },
      {
        id: "bathrooms",
        type: "select",
        label: "Baños",
        options: [
          { value: "0", label: "Seleccionar" },
          { value: "1", label: "1+" },
          { value: "2", label: "2+" },
          { value: "3", label: "3+" },
          { value: "4", label: "4+" },
        ],
        defaultValue: "0",  
      },
    ],
    [propertyTypes]
  );

  // Función para filtrar propiedades
  const filterProperties = useMemo(() => {
    return (properties: Property[], filters: PropertyFilters): Property[] => {
      return properties.filter((property) => {
        // Filter by price range
        if (
          property.price < (filters.price?.min || 0) ||
          property.price > (filters.price?.max || 1000000000)
        ) {
          return false;
        }

        // Filter by property type if any type is selected
        if (filters.types && filters.types.length > 0 && !filters.types.includes(property.type)) {
          return false;
        }

        // Filter by number of bedrooms if specified
        if (filters.bedrooms && filters.bedrooms > 0) {
          // If looking for 4+ bedrooms
          if (filters.bedrooms === 4 && property.bedrooms < 4) {
            return false;
          }
          // For specific number of bedrooms (1-3)
          if (filters.bedrooms < 4 && property.bedrooms !== filters.bedrooms) {
            return false;
          }
        }

        // Filter by number of bathrooms if specified
        if (filters.bathrooms && filters.bathrooms > 0) {
          // If looking for 4+ bathrooms
          if (filters.bathrooms === 4 && property.bathrooms < 4) {
            return false;
          }
          // For specific number of bathrooms (1-3)
          if (filters.bathrooms < 4 && property.bathrooms !== filters.bathrooms) {
            return false;
          }
        }

        return true;
      });
    };
  }, []);

  // Función para convertir filtros genéricos a filtros específicos de propiedades
  const convertToPropertyFilters = (genericFilters: Record<string, unknown>): PropertyFilters => {
    return {
      price: genericFilters.price as { min: number; max: number },
      types: genericFilters.types as string[],
      bedrooms: Number(genericFilters.bedrooms as string),
      bathrooms: Number(genericFilters.bathrooms as string),
      location: genericFilters.location as { city?: string },
    };
  };

  // Función para convertir filtros a variables de GraphQL
  const convertToGraphQLVariables = (filters: PropertyFilters) => {
    const variables: {
      where: {
        status: { equals: string };
        price?: { gte?: string; lte?: string };
        type?: { in: string[] };
        bedrooms?: { gte: number };
        bathrooms?: { gte: string };
        location?: {
          city?: { contains: string };
        };
      };
    } = {
      where: {
        status: { equals: "Activo" }
      }
    };

    // Price filter
    if (filters.price && (filters.price.min > 0 || filters.price.max < 1000000000)) {
      variables.where.price = {};
      if (filters.price.min > 0) variables.where.price.gte = String(filters.price.min);
      if (filters.price.max < 1000000000) variables.where.price.lte = String(filters.price.max);
    }

    // Type filter
    if (filters.types && filters.types.length > 0) {
      variables.where.type = { in: filters.types };
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms > 0) {
      variables.where.bedrooms = { gte: filters.bedrooms };
    }

    // Bathrooms filter
    if (filters.bathrooms && filters.bathrooms > 0) {
      variables.where.bathrooms = { gte: String(filters.bathrooms) };
    }

    // Location filter
    if (filters.location && filters.location.city) {
      variables.where.location = {
        city: { contains: filters.location.city },
      };
    }

    return variables;
  };

  return {
    filterConfigs,
    filterProperties,
    convertToPropertyFilters,
    convertToGraphQLVariables,
  };
};