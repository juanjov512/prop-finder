import React from "react";
import { EmptyContainer, EmptyIcon, EmptyTitle, EmptyMessage } from "./styles";
import type { IEmptyStateProps } from "./types";

const EmptyState: React.FC<IEmptyStateProps> = ({
  title = "No se encontraron propiedades",
  message = "No hay propiedades que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda.",
}: IEmptyStateProps) => (
  <EmptyContainer>
    <EmptyIcon>🏠</EmptyIcon>
    <EmptyTitle>{title}</EmptyTitle>
    <EmptyMessage>{message}</EmptyMessage>
  </EmptyContainer>
);

export default EmptyState;
