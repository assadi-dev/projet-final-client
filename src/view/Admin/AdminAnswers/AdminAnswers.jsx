import React, { useEffect, useState } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubComponentView from "./SubComponentView";

export const AdminAnswers = () => {
  const participantsPromise = useFetchData();
  const [expanded, setExpanded] = useState({});

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
      cell: ({ row }) => {
        return (
          <button onClick={() => handleClickCollapseRow(row)}>
            voir les reponses
          </button>
        );
      },
    }),
  ];

  const handleClickCollapseRow = (row) => {
    const isExpended = row.getIsExpanded();
    setExpanded(
      (current) => (current = { ...current, [row.index]: !isExpended })
    );
  };

  const handleExpanded = (props) => {
    console.log(props);
  };

  useEffect(() => {
    participantsPromise.fetch("/participants");
    return () => {
      participantsPromise?.abortController?.abort();
    };
  }, []);

  return (
    <div>
      <h1> Reponses de participants</h1>
      <DataTableCollapse
        columns={COLUMN}
        data={participantsPromise?.data?.data}
        isLoading={participantsPromise.isLoading}
        expanded={expanded}
        renderSubComponent={SubComponentView}
        setExpanded={handleExpanded}
      />
    </div>
  );
};

export default AdminAnswers;
