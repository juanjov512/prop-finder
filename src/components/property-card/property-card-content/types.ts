interface IPropertyCardContentProps {
  title?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images?: Array<{ image: { url: string } }>;
  price: number | string;
  type?: string;
  useLazyLoading?: boolean;
}

export type { IPropertyCardContentProps };
