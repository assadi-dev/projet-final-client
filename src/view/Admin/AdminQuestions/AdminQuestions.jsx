import React, { useEffect } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";

const AdminQuestions = () => {
  const { data, isLoading, errors, fetch, abortController } = useFetchData(
    "/surveys",
    null
  );

  const columnHelper = createColumnHelper();

  const COLUMN = [
    columnHelper.accessor("id", {
      header: () => "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: () => "Sondage",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "Action",
      cell: ({ row }) => <span>icon</span>,
    }),
  ];

  useEffect(() => {
    fetch("/surveys");
    return () => {
      abortController.current.abort();
    };
  }, []);

  return (
    <div>
      <h1> Questionnaire</h1>
      <DataTable columns={COLUMN} data={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default AdminQuestions;
