import React from 'react';
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

function Table({ data, columns }) {
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                {column.Header}
              </th>
            ))}
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row) => (
            <tr key={row.uuid}>
              {columns.map((column) => (
                <td key={column.accessor} className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  {typeof column.Cell === 'function' ? column.Cell(row) : row[column.accessor]}
                </td>
              ))}
              <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 flex items-center gap-2">
                <a href="#" className="text-blue-600 hover:text-blue-900">
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" className="text-orange-600 hover:text-orange-900">
                  <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                <a href="#" className="text-red-600 hover:text-red-900">
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
