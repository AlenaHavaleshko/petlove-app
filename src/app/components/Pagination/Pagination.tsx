import css from "./Pagination.module.css";
import { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hide pagination if only one page or invalid data
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  // Validate and constrain values
  const validCurrentPage = Math.max(1, Math.min(currentPage || 1, totalPages));
  const validTotalPages = totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = isMobile ? 2 : 3;

    if (validTotalPages <= maxVisiblePages + 1) {
      // Show all pages if total is small
      for (let i = 1; i <= validTotalPages; i++) {
        pages.push(i);
      }
    } else if (isMobile) {
      // Mobile: show 1, 2, ...
      pages.push(1);
      pages.push(2);
      pages.push("...");
    } else {
      // Always show first page
      pages.push(1);

      if (validCurrentPage <= 3) {
        // Show pages 2, 3, 4 and ellipsis
        for (let i = 2; i <= Math.min(3, validTotalPages - 1); i++) {
          pages.push(i);
        }
        if (validTotalPages > 3) {
          pages.push("...");
        }
        if (validTotalPages > 1) {
          pages.push(validTotalPages);
        }
      } else if (validCurrentPage >= validTotalPages - 2) {
        // Show ellipsis and last 4 pages
        pages.push("...");
        for (
          let i = Math.max(2, validTotalPages - 3);
          i <= validTotalPages;
          i++
        ) {
          pages.push(i);
        }
      } else {
        // Show ellipsis, current page with neighbors, and ellipsis
        pages.push("...");
        pages.push(validCurrentPage - 1);
        pages.push(validCurrentPage);
        pages.push(validCurrentPage + 1);
        pages.push("...");
        pages.push(validTotalPages);
      }
    }

    // Filter out any invalid values and ensure no duplicates
    return pages.filter((page, index, self) => {
      if (typeof page === "string") return true; // Keep ellipsis
      if (typeof page !== "number") return false; // Remove non-numbers
      if (page < 1 || page > validTotalPages) return false; // Remove out of range
      // Remove duplicates
      return self.indexOf(page) === index;
    });
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handlePrevPage = () => {
    if (validCurrentPage > 1) {
      onPageChange(validCurrentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (validCurrentPage < validTotalPages) {
      onPageChange(validCurrentPage + 1);
    }
  };

  const handleLastPage = () => {
    onPageChange(validTotalPages);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = validCurrentPage === 1;
  const isLastPage = validCurrentPage === validTotalPages;

  return (
    <div className={css.pagination}>
      <button
        className={`${css.paginationButton} ${css.arrowButton}`}
        onClick={handleFirstPage}
        disabled={isFirstPage}
        aria-label="Go to first page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M12 2L6 8L12 14M8 2L2 8L8 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={`${css.paginationButton} ${css.arrowButton}`}
        onClick={handlePrevPage}
        disabled={isFirstPage}
        aria-label="Go to previous page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M10 2L4 8L10 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={css.pageNumbers}>
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={css.ellipsis}>
                ...
              </span>
            );
          }

          if (typeof page !== "number") {
            return null; // Skip invalid entries
          }

          return (
            <button
              key={`page-${page}`}
              className={`${css.paginationButton} ${css.pageButton} ${
                page === validCurrentPage ? css.active : ""
              }`}
              onClick={() => handlePageClick(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === validCurrentPage ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={`${css.paginationButton} ${css.arrowButton}`}
        onClick={handleNextPage}
        disabled={isLastPage}
        aria-label="Go to next page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M6 2L12 8L6 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className={`${css.paginationButton} ${css.arrowButton}`}
        onClick={handleLastPage}
        disabled={isLastPage}
        aria-label="Go to last page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M4 2L10 8L4 14M8 2L14 8L8 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
