import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getExpandedRowModel,
} from "@tanstack/react-table";
import EmptyRow from "./EmptyRow";
import DataRowCollapse from "./DataRowCollapse";
import DatatRowLoader from "./DatatRowLoader";

const DataTableCollapse = ({
  columns,
  data,
  isLoading,
  expanded = {},
  setExpanded = () => {},
  renderSubComponent = ({ row }) => <div>Render subRowComponent here</div>,
}) => {
  const COLUMNS = React.useMemo(() => (columns ? columns : []), [columns]);
  const DATA = React.useMemo(() => (data ? data : []), [data]);

  const table = useReactTable({
    data: DATA,
    columns: COLUMNS,
    state: {
      expanded: expanded,
    },
    getCanExpand: true,

    getCoreRowModel: getCoreRowModel(),
    getSubRows: (rows) => rows.subRows,
    getExpandedRowModel: getExpandedRowModel(),
    manualExpanding: true,
    manualPagination: true,
  });

  return (
    <table className="table">
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
        {isLoading ? (
          <DatatRowLoader />
        ) : (
          <DataRowCollapse
            table={table}
            data={DATA}
            renderSubComponent={renderSubComponent}
          />
        )}
      </tbody>
    </table>
  );
};

export default DataTableCollapse;
