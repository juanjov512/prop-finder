import styled, { css } from 'styled-components';
import { IButtonProps, TButtonVariant, TButtonSize } from './types';

const getVariantStyles = (variant: TButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary[500]};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.primary[500]};
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary[600]};
          border-color: ${({ theme }) => theme.colors.primary[600]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.primary[700]};
          border-color: ${({ theme }) => theme.colors.primary[700]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
        }
        
        &:disabled {
          background-color: ${({ theme }) => theme.colors.gray[300]};
          border-color: ${({ theme }) => theme.colors.gray[300]};
          color: ${({ theme }) => theme.colors.gray[500]};
        }
      `;
      
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.gray[100]};
        color: ${({ theme }) => theme.colors.gray[900]};
        border: 1px solid ${({ theme }) => theme.colors.gray[200]};
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray[200]};
          border-color: ${({ theme }) => theme.colors.gray[300]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.gray[300]};
          border-color: ${({ theme }) => theme.colors.gray[400]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[100]};
        }
        
        &:disabled {
          background-color: ${({ theme }) => theme.colors.gray[100]};
          border-color: ${({ theme }) => theme.colors.gray[200]};
          color: ${({ theme }) => theme.colors.gray[400]};
        }
      `;
      
    case 'outline':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary[600]};
        border: 1px solid ${({ theme }) => theme.colors.primary[500]};
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary[50]};
          border-color: ${({ theme }) => theme.colors.primary[600]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.primary[100]};
          border-color: ${({ theme }) => theme.colors.primary[700]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
        }
        
        &:disabled {
          border-color: ${({ theme }) => theme.colors.gray[300]};
          color: ${({ theme }) => theme.colors.gray[400]};
        }
      `;
      
    case 'ghost':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.gray[700]};
        border: 1px solid transparent;
        
        &:hover {
          background-color: ${({ theme }) => theme.colors.gray[100]};
          color: ${({ theme }) => theme.colors.gray[900]};
        }
        
        &:active {
          background-color: ${({ theme }) => theme.colors.gray[200]};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray[100]};
        }
        
        &:disabled {
          color: ${({ theme }) => theme.colors.gray[400]};
        }
      `;

    default:
      return css``;
  }
};

const getSizeStyles = (size: TButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        min-height: 2rem;
      `;
      
    case 'md':
      return css`
        padding: 0.5rem 1rem;
        font-size: 1rem;
        line-height: 1.5rem;
        min-height: 2.5rem;
      `;
      
    case 'lg':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        line-height: 1.75rem;
        min-height: 3rem;
      `;
      
    case 'xl':
      return css`
        padding: 1rem 2rem;
        font-size: 1.25rem;
        line-height: 2rem;
        min-height: 3.5rem;
      `;
      
    default:
      return css``;
  }
};

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['loading', 'fullWidth', 'rounded', 'variant', 'size'].includes(prop),
})<IButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: ${({ theme, rounded }) => 
    rounded ? '9999px' : theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  /* Disabled state */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  /* Loading state */
  ${({ loading }) => loading && css`
    cursor: wait;
    pointer-events: none;
  `}
  
  /* Variant styles */
  ${({ variant = 'primary' }) => getVariantStyles(variant)}
  
  /* Size styles */
  ${({ size = 'md' }) => getSizeStyles(size)}
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LoadingSpinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export {
  StyledButton,
  ButtonContent,
  LoadingSpinner,
}

