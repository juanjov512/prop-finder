import React from "react";
import { PaginationContainer, PageButton, NavigationButton } from "./styles";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): Array<number | "..."> => {
    const pages: Array<number | "..."> = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = 4;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
    }

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <PaginationContainer className={className}>
      <NavigationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        $isActive={false}
      >
        &larr;
      </NavigationButton>

      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return <span key={`ellipsis-${index}`}>...</span>;
        }
        return (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            $isActive={page === currentPage}
            disabled={false}
            aria-label={`Ir a la página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </PageButton>
        );
      })}

      <NavigationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        $isActive={false}
      >
        &rarr;
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
