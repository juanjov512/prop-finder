import React from "react";
import { LoadingContainer, Spinner, LoadingText } from "./styles";
import type { ILoadingSpinnerProps } from "./types";

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  text = "Cargando...",
}: ILoadingSpinnerProps) => (
  <LoadingContainer>
    <Spinner />
    <LoadingText>{text}</LoadingText>
  </LoadingContainer>
);

export default LoadingSpinner;
