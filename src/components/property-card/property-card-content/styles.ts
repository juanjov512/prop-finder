import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 13rem;
  overflow: hidden;
`;

const ImageCounter = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  svg {
    font-size: 0.875rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Details = styled.div`
  padding:  ${({ theme }) => theme.spacing.lg};
  display: flex;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.875rem;
`;


const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary[500]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export {
    ImageContainer,
    ImageCounter,
    Details,
    CardContent,
    CardHeader,
    Price,
}
