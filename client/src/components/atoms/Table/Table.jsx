import React, {useState} from 'react';

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
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
