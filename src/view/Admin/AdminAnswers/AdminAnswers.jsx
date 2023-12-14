import React, { useEffect, useState } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../../components/DataTable/DataTable";

export const AdminAnswers = () => {
  const participantsPromise = useFetchData();
  const [surveySelected, setSurveySelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const columnHelper = createColumnHelper();

  const COLUMN = [
    columnHelper.accessor("survey", {
      header: () => "Sondage",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => "Email du participant",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      header: () => "date de participation",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "Action",
      cell: <button>voir les reponses</button>,
    }),
  ];

  useEffect(() => {
    participantsPromise.fetch("/participants");
    return () => {
      participantsPromise?.abortController?.abort();
    };
  }, []);

  return (
    <div>
      <h1> Reponses de participants</h1>
      <DataTable
        columns={COLUMN}
        data={participantsPromise.data?.data}
        isLoading={participantsPromise.isLoading}
      />
    </div>
  );
};

export default AdminAnswers;
