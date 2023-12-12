import React, { useEffect } from "react";
import useFetchData from "../../hook/useAdminFetchData";
import { useParams } from "react-router";
import QuestionCard from "../../components/question/QuestionCard";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

const Survey = () => {
  // récupération de l'id du sondage en paramètre
  // à changer avec un token après
  const {idSurvey} = useParams()
  const { data, isLoading, errors, fetch, abortController } = useFetchData("/client/questions/"+idSurvey, null
  ); // à remplacer après avec le useClientFetchData
  // construction des valeurs initiales de réponses et schema de validation
  let initValues = {}, schema = {}
  data?.data.forEach(question => {
        initValues = { ...initValues, ["q"+question.id]: ""};
        console.log(question);
        if(question.required) schema = {...schema, ["q"+question.id]: Yup.string().required('Ce champ est obligatoire')}
        if(question.is_email && question.required) schema = {...schema, ["q"+question.id]: Yup.string().email('Adresse mail invalide')
                                                                                  .required('Ce champ est obligatoire')}
        if(question.question_type == 'C' && question.required) schema = {...schema, ["q"+question.id]: Yup.number().min(question.min_val, `Valeur minimale ${question.min_val}`)
                                                                                  .max(question.max_val, `Valeur maximale ${question.max_val}`)
                                                                                  .required('Ce champ est obligatoire')}
      });

  useEffect(() => {
    fetch("/client/questions/"+idSurvey, null); //idSuervey sera remplacé par le token
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
    {isLoading && <p>Chargement en cours</p>}
    { data?.data &&
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object(schema)}
      onSubmit={(values) => {
        setTimeout(() => {
          console.log("you");
          alert(JSON.stringify(values, null, 2));
          //setSubmitting(false);
        }, 400);
      }}
    >
      <Form>
        {data.data.map((question, index) => (
        <QuestionCard question={question} key={index}></QuestionCard>
      ))}
        <button type="submit">Envoyer</button>
      </Form>
    </Formik>}
  </div>
  );
};

export default Survey;
