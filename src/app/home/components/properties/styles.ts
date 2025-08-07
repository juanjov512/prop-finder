import { devices } from "@/styles/breakpoints";
import styled from "styled-components";

const PropertiesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PropertiesList = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1 1 60%;

  @media ${devices.tablet} {
    flex: 1 1 50%;
  }

  @media ${devices.mobile} {
    flex: 1 1 100%;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-top: auto;
`;

export {
    PropertiesContainer,
    PropertiesList,
    PaginationWrapper,
};
