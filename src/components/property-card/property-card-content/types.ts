import { PropertyImage } from "@/gql/graphql";

interface IPropertyCardContentProps {
    title: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: PropertyImage[];
    price: string | number;
    type: string;
}

export type { IPropertyCardContentProps };