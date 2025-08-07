import { gql } from '@apollo/client';

export const GET_PROPERTIES = gql`
  query Properties($where: PropertyWhereInput, $orderBy: [PropertyOrderByInput!]!, $take: Int, $skip: Int) {
    propertiesCount(where: $where)
    properties(
      orderBy: $orderBy
      take: $take
      skip: $skip
      where: $where
    ) {
      id
      number
      type
      objective
      price
      bedrooms
      bathrooms
      area
      parkingSpots
      stratum
      status
      title
      lastPublishDate
      createdAt
      images(orderBy: { order: asc }) {
        id
        order
        image {
          id
          url
        }
      }
      location {
        lat
        lng
        city
        state
        country
      }
      team {
        id
        name
        image {
          url
        }
      }
    }
  }
`;

export const GET_PROPERTIES_COUNT = gql`
  query PropertiesCount($where: PropertyWhereInput) {
    propertiesCount(where: $where)
  }
`;
