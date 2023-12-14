import React, { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import EmptyRow from "./EmptyRow";
import DataRow from "./DataRow";
import DatatRowLoader from "./DatatRowLoader";

const DataTable = ({ columns, data, isLoading }) => {
  const COLUMNS = React.useMemo(() => (columns ? columns : []), [columns]);
  const DATA = React.useMemo(() => (data ? data : []), [data]);

  const table = useReactTable({
    data: DATA,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {isLoading ? <DatatRowLoader /> : <DataRow table={table} data={DATA} />}
      </tbody>
    </table>
  );
};

export default DataTable;
