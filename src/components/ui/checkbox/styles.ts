import styled, { css } from 'styled-components';

const CheckboxContainer = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  user-select: none;
  width: 100%;
  padding: 0.5rem 0;

  &:hover {
    .checkbox__control {
      border-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.gray[300] : theme.colors.primary[500]};
    }
  }
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
`;

const CheckboxControl = styled.span<{ checked: boolean; disabled?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${({ checked, theme, disabled }) =>
    checked &&
    !disabled &&
    css`
      background-color: ${theme.colors.primary[500]};
      border-color: ${theme.colors.primary[500]};
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.gray[100]};
      border-color: ${theme.colors.gray[300]};
    `}

  &::after {
    content: '';
    position: absolute;
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    left: 6px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxLabel = styled.span<{ disabled?: boolean }>`
  font-size: 0.875rem;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray[400] : theme.colors.gray[700]};
  line-height: 1.25rem;
`;

const CheckboxGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

export {
  CheckboxContainer,
  CheckboxInput,
  CheckboxControl,
  CheckboxLabel,
  CheckboxGroupContainer,
}
