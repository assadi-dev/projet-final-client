import React, { useEffect, useState } from "react";
import useFetchData from "../../../hook/useAdminFetchData";
import { createColumnHelper } from "@tanstack/react-table";
import DataTableCollapse from "../../../components/DataTableCollapse/DataTableCollapse";
import SubRowAnswerComponentView from "./SubRowAnswerComponentView";
import ReactPaginate from "react-paginate";

export const AdminAnswers = () => {
  const participantsPromise = useFetchData();
  const [expanded, setExpanded] = useState({});

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

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    participantsPromise.fetch("/participants");
    return () => {
      participantsPromise?.abortController?.abort();
    };
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    /*  const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset); */
  };

  return (
    <div>
      <h1> Reponses de participants</h1>
      <DataTableCollapse
        columns={COLUMN}
        data={participantsPromise?.data?.data}
        isLoading={participantsPromise.isLoading}
        expanded={expanded}
        renderSubComponent={SubRowAnswerComponentView}
      />
      {/*       <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={44}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      /> */}
    </div>
  );
};

export default AdminAnswers;
