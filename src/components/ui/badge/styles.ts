import styled from "styled-components";
import type { IStyledBadgeProps } from "./types";

const Badge = styled.span<IStyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ theme, variant }) =>
    variant === "primary" ? theme.colors.primary[500] : theme.colors.gray[200]};
  color: ${({ theme, variant }) =>
    variant === "primary" ? theme.colors.white : theme.colors.gray[700]};
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export default Badge;

