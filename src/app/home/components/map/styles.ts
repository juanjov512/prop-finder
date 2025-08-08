import styled from "styled-components";
import { devices } from "@/styles/breakpoints";

const MapContainer = styled.div<{ $isVisible: boolean }>`
  flex: 0 0 40%;
  border-left: 1px solid ${({ theme }) => theme.colors.gray[200]};
  top: 0;
  position: sticky;
  height: 100%;
  
  @media ${devices.mobile} {
    height: ${({ $isVisible }) => $isVisible ? "100%" : "0"};
    width: ${({ $isVisible }) => $isVisible ? "100%" : "0"};
    position: ${({ $isVisible }) => $isVisible ? "fixed" : "sticky"};
    display: ${({ $isVisible }) => $isVisible ? "block" : "none"};
  }

  @media ${devices.tablet} {
    flex: 0 0 50%;
  }
`;

const MapPlaceholder = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
    MapContainer,
    MapPlaceholder
};
