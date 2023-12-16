import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import TroncateText from "../../../components/TroncateText/TroncateText";

const RenderListView = ({ token }) => {
  const { data, isLoading, error, abortController, fetch } = useFetchData();
  const promise = useFetchData();

  const columnHelper = createColumnHelper();
  const COLUMN = [
    columnHelper.accessor("question_number", {
      header: (props) => "Numéro de la question",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("question_body", {
      header: () => "Corps de la question",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("value", {
      header: () => "Reponse",
      cell: (info) =>
        info.row.original.question_type == "C"
          ? info.getValue() + " sur 5"
          : info.getValue(),
    }),
  ];

  useEffect(() => {
    if (!token) return;
    fetch(`/admin/answers/${token}`);
    return () => {
      abortController.abort();
    };
  }, [token, abortController, fetch]);

  return (
    <div className="card">
      <div className="card-body">
        <DataTable columns={COLUMN} data={data?.data} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default RenderListView;
