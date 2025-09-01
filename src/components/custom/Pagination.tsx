import React from "react";
import { PaginationProps } from "../../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  // Pagination functions
  const goToPage = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* Previous Page Button */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-lavender-300 hover:bg-lavender-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lavender-700 font-medium"
        title="Go to previous page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={
              typeof page === "number" ? `page-${page}` : `ellipsis-${index}`
            }
            onClick={() => typeof page === "number" && goToPage(page)}
            disabled={page === "..."}
            aria-label={
              typeof page === "number" ? `Go to page ${page}` : "Page separator"
            }
            className={`px-3 py-2 rounded-lg border transition-colors ${
              page === currentPage
                ? "bg-lavender-200 text-lavender-800 border-lavender-300"
                : page === "..."
                ? "border-lavender-300 text-lavender-500 cursor-default"
                : "border-lavender-300 text-lavender-700 hover:bg-lavender-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-lavender-300 hover:bg-lavender-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lavender-700 font-medium"
        title="Go to next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
