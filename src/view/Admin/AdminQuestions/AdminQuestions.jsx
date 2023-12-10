import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import useFetchData from "../../../hook/useAdminFetchData";
import Modal from "../../../components/Modal";
import RenderListQuestion from "./RenderListQuestion";

const AdminQuestions = () => {
  const { data, isLoading, errors, fetch, abortController } = useFetchData(
    "/surveys",
    null
  );
  const [surveySelected, setSurveySelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

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
        <button onClick={() => handleShowListQuestion(row?.original)}>
          voir les questions
        </button>
      ),
    }),
  ];

  const toggleModal = () => {
    setIsOpen((current) => (current = !current));
  };

  const handleShowListQuestion = (survey) => {
    setSurveySelected(survey);
    toggleModal();
  };

  useEffect(() => {
    fetch("/surveys");
    return () => {
      abortController?.abort();
    };
  }, []);

  return (
    <div>
      <h1> Questionnaire</h1>
      <DataTable columns={COLUMN} data={data?.data} isLoading={isLoading} />
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <RenderListQuestion surveyData={surveySelected} />
      </Modal>
    </div>
  );
};

export default AdminQuestions;
