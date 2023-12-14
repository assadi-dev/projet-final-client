import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import Modal from "../../../components/Modal";
import RenderListQuestion from "./RenderListQuestion";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowSurveyComponentView from "./SubRowSurveyComponentView";

const AdminQuestions = () => {
  const { data, isLoading, errors, fetch, abortController } = useFetchData();
  const [expanded, setExpanded] = useState({});

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
      cell: ({ row }) => (
        <button onClick={() => handleClickCollapseRow(row)}>
          voir les questions
        </button>
      ),
    }),
  ];

  useEffect(() => {
    fetch("/surveys");
    return () => {
      abortController?.abort();
    };
  }, []);

  const handleClickCollapseRow = (row) => {
    const isExpended = row.getIsExpanded();
    setExpanded(
      (current) => (current = { ...current, [row.index]: !isExpended })
    );
  };

  return (
    <div>
      <h1> Questionnaire</h1>
      <DataTableCollapse
        columns={COLUMN}
        data={data?.data}
        isLoading={isLoading}
        expanded={expanded}
        renderSubComponent={SubRowSurveyComponentView}
      />
    </div>
  );
};

export default AdminQuestions;
