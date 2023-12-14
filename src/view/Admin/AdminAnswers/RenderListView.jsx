import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";

const RenderListView = ({ token }) => {
  if (!token) return;

  const promise = useFetchData();

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

  useEffect(() => {
    if (!token) return;
    promise.fetch(`/admin/answers/${token}`);
    return () => {
      promise.abortController.abort();
    };
  }, [token]);

  return (
    <div>
      <DataTable
        columns={COLUMN}
        data={promise?.data?.data}
        isLoading={promise.isLoading}
      />
    </div>
  );
};

export default RenderListView;
