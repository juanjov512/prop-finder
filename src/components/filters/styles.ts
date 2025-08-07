import styled from "styled-components";

const FiltersContainer = styled.div<{ $isOpen: boolean }>`
  padding: ${({ $isOpen, theme }) => $isOpen ? `0 ${theme.spacing.lg}` : '0'};
  gap: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${({ $isOpen }) => $isOpen ? '20rem' : '0'};
  min-width: ${({ $isOpen }) => $isOpen ? '20rem' : '0'};
  max-width: ${({ $isOpen }) => $isOpen ? '20rem' : '0'};
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.gray[200]};
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `0.5rem ${theme.spacing.md}`};
  width: 100%;
  
  h3 {  
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .badge-container {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FiltersContent = styled.div<{ $isOpen: boolean }>`
  gap: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  transition: opacity 0.2s ease;
  pointer-events: ${({ $isOpen }) => $isOpen ? 'all' : 'none'};
  overflow: visible;
`;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PriceRange = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const FilterActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

export {
  FiltersContainer,
  Header,
  Title,
  FiltersContent,
  SectionTitle,
  PriceRange,
  FilterActions,
};

