import React, { useEffect } from "react";
import useFetchData from "../../hook/useAdminFetchData";
import { useParams } from "react-router";
import QuestionCard from "../../components/question/QuestionCard";

const Survey = () => {
  // récupération de l'id deu sondage en paramètre
  // à chnager avec un token après
  const {idSurvey} = useParams()
  const { data, isLoading, errors, fetch, abortController } = useFetchData(
    "/client/questions/"+idSurvey,
    null
  ); // à remplacer après avec le useClientFetchData

   useEffect(() => {
    fetch("/client/questions/"+idSurvey, null);
    return () => {
      abortController.current.abort();
    };
  }, [])

  return (
  <div>
    <div>
      <h1>Nom du sondage</h1>
      <p>Description</p>
    </div>
    <form method="post">
      {isLoading && <p>Chargement en cours</p>}
      {data?.data && data.data.map((question, index) => (
        <QuestionCard question={question} key={index}></QuestionCard>
      ))}
      <button>Envoyer</button>
    </form>
  </div>
  );
};

export default Survey;
