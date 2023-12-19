import React, { useEffect, useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowSurveyComponentView from "./SubRowSurveyComponentView";
import { FaEye } from "react-icons/fa6";
import PageCardWrapper from "../PageCardWrapper/PageCardWrapper";
import PaginationView from "../../../components/PaginationView/PaginationView";
import DatatRowLSpinnerLoader from "../../../components/DefaultRowLoader/DatatRowLSpinnerLoader";
import { Tooltip } from "react-tooltip";
import AlertError from "../../../components/AlertError/AlertError";

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
        <>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleClickCollapseRow(row)}
            data-tooltip-id="btn-tooltip"
            data-tooltip-content="Cliquer pour voir les questions"
          >
            <FaEye />
          </button>
          <Tooltip id="btn-tooltip" place="bottom" />
        </>
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
      {errors && <AlertError message={errors} />}

      <div className="d-flex justify-content-end">
        <p className="mx-3">
          <strong>A</strong>: Choix multiple{" "}
        </p>
        <p className="mx-3">
          <strong>B</strong> : Saisie{" "}
        </p>
        <p className="mx-3">
          <strong>C</strong> : Choix numérique de 1 à 5{" "}
        </p>
      </div>

      <DataTableCollapse
        columns={COLUMN}
        data={data?.data}
        isLoading={isLoading}
        expanded={expanded}
        renderSubComponent={SubRowSurveyComponentView}
        RowRenderLoader={DatatRowLSpinnerLoader}
      />
      <PaginationView onPageChange={handlePageClick} pageCount={PAGE_COUNT} />
    </PageCardWrapper>
  );
};

export default AdminQuestions;
