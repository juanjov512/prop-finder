import React from "react";
import {
  ErrorContainer,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
} from "./styles";
import type { IErrorStateProps } from "./types";

const ErrorState: React.FC<IErrorStateProps> = ({
  title = "Error al cargar las propiedades",
  message = "Ha ocurrido un error inesperado. Por favor, intenta de nuevo.",
  onRetry,
}: IErrorStateProps) => (
  <ErrorContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorTitle>{title}</ErrorTitle>
    <ErrorMessage>{message}</ErrorMessage>
    {onRetry && <RetryButton onClick={onRetry}>Reintentar</RetryButton>}
  </ErrorContainer>
);

export default ErrorState;
