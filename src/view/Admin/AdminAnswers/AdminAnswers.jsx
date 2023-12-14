import React, { useEffect, useState } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../../components/DataTable/DataTable";

export const AdminAnswers = () => {
  const { data, isLoading, errors, fetch, abortController } = useFetchData();
  const [surveySelected, setSurveySelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const columnHelper = createColumnHelper();

  const COLUMN = [
    columnHelper.accessor("question_number", {
      header: () => "Numero de la question",
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
    fetch("/answers");
    return () => {
      abortController?.abort();
    };
  }, []);

  return (
    <div>
      <h1> Reponses de participants</h1>
      <DataTable columns={COLUMN} data={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default AdminAnswers;
