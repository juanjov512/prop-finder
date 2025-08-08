import { devices } from "@/styles/breakpoints";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing['2xl']}`};
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 0 ${({ theme }) => theme.spacing['2xl']};

  @media ${devices.mobile} {
    margin: 0 ${({ theme }) => theme.spacing.xs};
  }

  @media ${devices.tablet} {
    max-width: 400px;
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;

export {
  NavbarContainer,
  NavbarLeft,
  NavbarCenter,
  NavbarRight,
}; 