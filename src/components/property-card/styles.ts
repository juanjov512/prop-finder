import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease;
  height: 100%;
  min-height: 29rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Location = styled.div`
  display: flex;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-top: auto;
`;

const Objective = styled.span<{ children: string }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme, children }) => 
    children.toLowerCase() === 'venta' ? theme.colors.green[600] : 
    children.toLowerCase() === 'arriendo' ? theme.colors.primary[600] : 
    theme.colors.gray[500]};
`;

export {
  StyledCard,
  Footer,
  Location,
  Action,
  Objective,
}
