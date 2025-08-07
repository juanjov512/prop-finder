export type ImageFieldOutput = {
  id: string;
  url: string;
};

export type PropertyImage = {
  id: string;
  order: number;
  image: ImageFieldOutput;
};

export type Location = {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
};

export type Team = {
  id: string;
  name: string;
  image: ImageFieldOutput;
};

export type Property = {
  id: string;
  number: number;
  type: string;
  objective: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parkingSpots: number;
  stratum: number;
  status: string;
  title: string;
  lastPublishDate: string;
  createdAt: string;
  images: PropertyImage[];
  location: Location;
  team: Team;
};

export type PropertiesQueryResult = {
  propertiesCount: number;
  properties: Property[];
};

export type WhereInput = {
  status?: { equals: string };
  price?: { gte?: string; lte?: string };
  type?: { in?: string[] };
  bedrooms?: { gte?: number } | { equals: number };
  bathrooms?: { gte?: string } | { equals: string };
  location?: {
    city?: { contains?: string };
    state?: { contains?: string };
  };
};

export type PropertiesQueryVariables = {
  where?: WhereInput;
  orderBy?: Array<{
    number?: 'asc' | 'desc';
    price?: 'asc' | 'desc';
    createdAt?: 'asc' | 'desc';
    title?: 'asc' | 'desc';
    type?: 'asc' | 'desc';
    lastPublishDate?: 'asc' | 'desc';
  }>;
  take?: number;
  skip?: number;
};