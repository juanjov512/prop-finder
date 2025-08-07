import styled from "styled-components";
import { IStyledSelectOptionProps } from "./types";
import * as SelectPrimitive from '@radix-ui/react-select';

const SelectContainer = styled(SelectPrimitive.Root)`
  position: relative;
  width: 100%;
`;

const SelectButton = styled(SelectPrimitive.Trigger)`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const SelectOptions = styled(SelectPrimitive.Content)`
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 200px;
  overflow-y: auto;
`;

const SelectOption = styled(SelectPrimitive.Item).withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<IStyledSelectOptionProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  ${({ theme, isSelected }) => isSelected && `
    background-color: ${theme.colors.gray[100]};
  `}
`;

const SelectOptionIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export { 
    SelectContainer, 
    SelectButton, 
    SelectOptions, 
    SelectOption,
    SelectOptionIndicator, 
};
