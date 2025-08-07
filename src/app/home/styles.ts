import styled from "styled-components";
import { devices } from "@/styles/breakpoints";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  
  @media ${devices.mobile} {
    flex-direction: column;
  }
`;



export {
    DashboardContainer,
    MainContent,
    ContentWrapper,
};
