import React from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";

const SubComponentView = ({ row }) => {
  console.log(row.original);
  const columnHelper = createColumnHelper();
  const COLUMN = [
    columnHelper.accessor("question_number", {
      header: () => "Numéro de la question",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("question_body", {
      header: () => "Corps de la question",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: () => "Reponse",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div>
      <DataTable columns={COLUMN} />
    </div>
  );
};

export default SubComponentView;
