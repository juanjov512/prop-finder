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
  position: relative;
  overflow-x: hidden;
  
  @media ${devices.mobile} {
    flex-direction: column;
  }
`;

const ToggleViewButton = styled.button`
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 100;
  float: right;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.gray[600]};
  display: none;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    transform: translateY(-1px);
  }

  @media ${devices.mobile} {
    display: flex;
  }
`;

export {
    DashboardContainer,
    MainContent,
    ContentWrapper,
    ToggleViewButton,
};
