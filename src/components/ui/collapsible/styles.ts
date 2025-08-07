import styled from "styled-components";

const CollapsibleContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CollapsibleContent = styled.div`
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 0.5rem 0;
`;

export { CollapsibleContainer, CollapsibleContent };
