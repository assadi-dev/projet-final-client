import React, { useEffect } from "react";
import useFetchData from "../../../hook/useAdminFetchData";

const RenderListQuestion = ({ surveyData }) => {
  const { fetch, isLoading, data, error } = useFetchData();

  useEffect(() => {
    fetch(`/questions/${surveyData?.id}`);
  }, []);

  return (
    <div>
      <p>Questions de {surveyData?.title}</p>

      <div>
        <table>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Intitulé</th>
              <th>Type</th>
              <th>Proposition</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={20}>Chargement en cours</td>
              </tr>
            )}
            {!isLoading &&
              data.data.map((question) => (
                <tr key={question.id}>
                  <td>{question.question_number}</td>
                  <td>{question.question_body}</td>
                  <td>{question.question_type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenderListQuestion;