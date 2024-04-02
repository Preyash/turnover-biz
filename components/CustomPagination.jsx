import React from "react";
import { usePagination, DOTS } from "@/utils/usePagination";

const CustomPagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  let lastPage = paginationRange?.[paginationRange?.length - 1];

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onFirst = () => {
    onPageChange(1);
  };

  const onLast = () => {
    onPageChange(lastPage);
  };

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const disabledClasses = "disabled:opacity-50 disabled:pointer-events-none";

  return (
    <div className="pagination flex justify-between items-center">
      <button
        className={`arrow pagination-item ${
          currentPage === 1 ? disabledClasses : ""
        }`}
        disabled={currentPage === 1}
        onClick={onFirst}
      >
        &#171;
      </button>
      <button
        className={`arrow pagination-item ${
          currentPage === 1 ? disabledClasses : ""
        }`}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        &lsaquo;
      </button>
      {(paginationRange || [])?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div className="dots" key={index}>
              &#8230;
            </div>
          );
        }
        return (
          <button
            className={`pagination-item ${
              pageNumber === currentPage ? "bg-gray-300" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`arrow pagination-item ${
          currentPage === lastPage ? disabledClasses : ""
        }`}
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        &#8250;
      </button>
      <button
        className={`arrow pagination-item ${
          currentPage === lastPage ? disabledClasses : ""
        }`}
        disabled={currentPage === lastPage}
        onClick={onLast}
      >
        &#187;
      </button>
    </div>
  );
};

export default CustomPagination;
