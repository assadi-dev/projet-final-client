import React, { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowSurveyComponentView from "./SubRowSurveyComponentView";
import { FaEye } from "react-icons/fa6";
import PageCardWrapper from "../PageCardWrapper/PageCardWrapper";
import PaginationView from "../../../components/PaginationView/PaginationView";

const AdminQuestions = () => {
  const { data, isLoading, errors, fetch, abortController } = useFetchData();
  const [expanded, setExpanded] = useState({});
  const [pageIndex, setPageIndex] = useState(0);

  const PAGE_COUNT = useMemo(() => {
    return data?.meta?.last_page || 1;
  }, [data]);

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
          className="btn btn-primary btn-sm"
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
    const params = {
      page: pageIndex,
    };
    fetch("/surveys", params);
  }, [pageIndex]);

  const handleClickCollapseRow = (row) => {
    const isExpended = row.getIsExpanded();
    setExpanded(
      (current) => (current = { ...current, [row.index]: !isExpended })
    );
  };
  const handlePageClick = (event) => {
    const nextPage = event.selected + 1;
    setPageIndex(nextPage);
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
      <PaginationView onPageChange={handlePageClick} pageCount={PAGE_COUNT} />
    </PageCardWrapper>
  );
};

export default AdminQuestions;
