import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";

const RenderListView = ({ token }) => {
<<<<<<< Updated upstream
  if (!token) return;

  const promise = useFetchData();
=======
  const { data, isLoading, error, abortController, fetch } = useFetchData();
  useEffect(() => {
    if (!token) return;
    fetch(`/admin/answers/${token}`);
    return () => {
      abortController.abort();
    };
  }, [token, abortController, fetch]);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  useEffect(() => {
    if (!token) return;
    promise.fetch(`/admin/answers/${token}`);
    return () => {
      promise.abortController.abort();
    };
  }, [token]);

=======
>>>>>>> Stashed changes
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
