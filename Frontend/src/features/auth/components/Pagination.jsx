// Pagination.jsx
const Pagination = ({ pageIndex, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={() => onPageChange(pageIndex - 1)}
        disabled={pageIndex === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        Page {pageIndex} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(pageIndex + 1)}
        disabled={pageIndex === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
