import React, { useEffect, useMemo, useState } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowAnswerComponentView from "./SubRowAnswerComponentView";
import { FaEye } from "react-icons/fa6";
import { dateFormatTostring } from "../../../utils/dateFormat";
import ReactPaginate from "react-paginate";
import PageCardWrapper from "../PageCardWrapper/PageCardWrapper";
export const AdminAnswers = () => {
  const [expanded, setExpanded] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const participantsPromise = useFetchData();

  const columnHelper = createColumnHelper();

  const COLUMN = [
    columnHelper.accessor("survey.title", {
      header: () => "Sondage",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => "Email du participant",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      header: () => "date de participation",
      cell: (info) => dateFormatTostring(info.getValue()),
    }),
    columnHelper.display({
      id: "Action",
      cell: ({ row }) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => handleClickCollapseRow(row)}
          >
            <FaEye />
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

  useEffect(() => {
    const params = {
      page: pageIndex,
    };

    participantsPromise.fetch(`/participants?page${pageIndex}`, params);
  }, [pageIndex, participantsPromise?.abortController]);

  const TOTAL_COUNT = useMemo(() => {
    return participantsPromise.data?.meta?.total || 0;
  }, [participantsPromise.data]);

  const ITEM_PER_PAGE = useMemo(() => {
    return participantsPromise.data?.meta?.per_page || 0;
  }, [participantsPromise.data]);
  const PAGE_COUNT = useMemo(() => {
    return participantsPromise.data?.meta?.last_page || 1;
  }, [participantsPromise.data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const nextPage = event.selected + 1;
    setPageIndex(nextPage);
  };

  return (
    <PageCardWrapper pageTitle="Reponses de participants" className="row">
      <DataTableCollapse
        columns={COLUMN}
        data={participantsPromise?.data?.data}
        isLoading={participantsPromise.isLoading}
        expanded={expanded}
        renderSubComponent={SubRowAnswerComponentView}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        activeLinkClassName=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={PAGE_COUNT}
        previousLabel="<<"
        previousLinkClassName="page-link"
        className="pagination"
        activeClassName="active"
      />
    </PageCardWrapper>
  );
};

export default AdminAnswers;
