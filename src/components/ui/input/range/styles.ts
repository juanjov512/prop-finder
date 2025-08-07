import styled from 'styled-components';
import * as SliderPrimitive from '@radix-ui/react-slider';

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

export const RangeLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
  display: block;
`;

export const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const RangeInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[900]};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-align: center;

  &[type='number'] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary[100]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const RangeSeparator = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[500]};
  white-space: nowrap;
`;

// Slider Components
export const SliderRoot = styled(SliderPrimitive.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;
  width: 100%;
  height: 20px;
`;

export const SliderTrack = styled(SliderPrimitive.Track)`
  background-color: ${({ theme }) => theme.colors.gray[200]};
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  height: 4px;
`;

export const SliderRange = styled(SliderPrimitive.Range)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 9999px;
  height: 100%;
`;

export const SliderThumb = styled(SliderPrimitive.Thumb)`
  display: block;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary[200]};
  }

  &[data-disabled] {
    background-color: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
`;
