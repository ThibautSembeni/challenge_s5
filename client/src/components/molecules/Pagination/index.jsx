import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Pagination({
  className,
  currentPage,
  setCurrentPage,
  basePath,
  itemsPerPage,
  totalItems,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (!totalItems) return;

  return (
    <nav
      className={`flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6 ${className}`}
    >
      <div className="-mt-px flex w-0 flex-1">
        {currentPage === 1 ? (
          <span className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 pointer-events-none">
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </span>
        ) : (
          <Link
            to={`${basePath}?page=${currentPage - 1}`}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </Link>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {[...Array(totalPages).keys()].map((page) => (
          <Link
            key={page + 1}
            to={`${basePath}?page=${page + 1}`}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              currentPage === page + 1
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
            aria-current={currentPage === page + 1 ? "page" : undefined}
          >
            {page + 1}
          </Link>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {currentPage === totalPages ? (
          <span className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 pointer-events-none">
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        ) : (
          <Link
            to={`${basePath}?page=${currentPage + 1}`}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
