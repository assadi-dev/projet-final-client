import React, { useEffect } from "react";
import useFetchData from "../../hook/useAdminFetchData";
import { useParams } from "react-router";
import QuestionCard from "../../components/question/QuestionCard";
import { useFormik } from "formik";
import * as Yup from 'yup';

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

  const validate = values => {
    const errors = {};
    for (let key in values) {
      if (!values[key]) {
        errors[key] = 'Ce champ est requis';   
      }
    }
    console.log(errors);
    return errors    
  }
  const formik = useFormik({
    initialValues: {
    },
    validate,
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
  <div>
    <div>
      <h1>Nom du sondage</h1>
      <p>Description</p>
    </div>
    <form onSubmit={formik.handleSubmit}>
      {isLoading && <p>Chargement en cours</p>}
      {data?.data && data.data.map((question, index) => (
        <QuestionCard question={question} key={index} formik={formik}></QuestionCard>
      ))}
      <button type="submit">Envoyer</button>
    </form>
  </div>
  );
};

export default Survey;
