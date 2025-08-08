import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

interface IPageButtonProps {
  $isActive: boolean;
}

const PageButton = styled.button<IPageButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: 0 0.5rem;
  border: 1px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary[500] : theme.colors.gray[200]};
  border-radius: 0.375rem;
  background-color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary[500] : 'transparent'};
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.white : theme.colors.gray[900]};
  font-weight: ${({ $isActive }) => $isActive ? 600 : 400};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $isActive }) => 
      $isActive ? theme.colors.primary[500] : theme.colors.gray[100]};
    border-color: ${({ theme, $isActive }) => 
      $isActive ? theme.colors.primary[500] : theme.colors.gray[200]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface INavigationButtonProps {
  $isActive?: boolean;
}

const NavigationButton = styled(PageButton).withConfig({
  shouldForwardProp: (prop) => prop !== '$isActive',
})<INavigationButtonProps>`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.gray[900]};
  font-weight: 600;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export {
    PaginationContainer,
    PageButton,
    NavigationButton,
}
