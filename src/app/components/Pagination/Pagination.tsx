import css from "./Pagination.module.css";

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
  // Hide pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show pages 2, 3, 4 and ellipsis
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
      } else if (currentPage >= totalPages - 2) {
        // Show ellipsis and last 3 pages
        pages.push("...");
        for (let i = totalPages - 3; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show ellipsis, current page with neighbors, and ellipsis
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

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

          return (
            <button
              key={`page-${page}`}
              className={`${css.paginationButton} ${css.pageButton} ${
                page === currentPage ? css.active : ""
              }`}
              onClick={() => handlePageClick(page as number)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
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
