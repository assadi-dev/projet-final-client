import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import Modal from "../../../components/Modal";
import RenderListQuestion from "./RenderListQuestion";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowSurveyComponentView from "./SubRowSurveyComponentView";
import { FaEye } from "react-icons/fa6";
import PageCardWrapper from "../PageCardWrapper/PageCardWrapper";

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
        <button
          className="btn btn-primary"
          onClick={() => handleClickCollapseRow(row)}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Afficher les questions"
        >
          <FaEye />
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
    <PageCardWrapper pageTitle="Questionnaire">
      <DataTableCollapse
        columns={COLUMN}
        data={data?.data}
        isLoading={isLoading}
        expanded={expanded}
        renderSubComponent={SubRowSurveyComponentView}
      />
    </PageCardWrapper>
  );
};

export default AdminQuestions;
