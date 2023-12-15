import React, { useEffect, useState } from "react";
import useClientFetchData from "../../../hook/useClientFetchData";
import { useParams } from "react-router";
import QuestionCard from "../../../components/question/QuestionCard";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { formatAnswerObject } from "../../../helpers/answerObject";
import { createAnswers } from "../../../services/api/answer";
import { useNavigate } from "react-router-dom";
import style from "./survey.module.css";

const Survey = () => {
  const [submiting, setSubmiting] = useState(false)
  const navigate = useNavigate();
  // récupération de l'id du sondage en paramètre
  // à changer avec un token après
  const { idSurvey } = useParams();
  // à remplacer après avec le useClientFetchData
  const questionsObjet = useClientFetchData(
    "/client/questions/" + idSurvey,
    null
  );
  // récupération des données du sondage
  const surveyObject = useClientFetchData("/client/surveys/" + idSurvey, null);

  // construction des valeurs initiales de réponses et schema de validation
  let initValues = {},
    schema = {};
  questionsObjet.data?.data.forEach((question) => {
    initValues = { ...initValues, ["q" + question.id]: "" }; // valeurs initiales
    //schema
    if (question.required)
      schema = {
        ...schema,
        ["q" + question.id]: Yup.string().required("Ce champ est obligatoire"),
      };
    if (question.is_email && question.required)
      schema = {
        ...schema,
        ["q" + question.id]: Yup.string()
          .email("Adresse mail invalide")
          .required("Ce champ est obligatoire"),
      };
    if (question.question_type == "C" && question.required)
      schema = {
        ...schema,
        ["q" + question.id]: Yup.number()
          .min(question.min_val, `Valeur minimale ${question.min_val}`)
          .max(question.max_val, `Valeur maximale ${question.max_val}`)
          .required("Ce champ est obligatoire"),
      };
  });

  useEffect(() => {
    questionsObjet.fetch("/client/questions/" + idSurvey, null); //idSurvey sera remplacé par le token
    surveyObject.fetch("/client/surveys/" + idSurvey, null);
    return () => {
      surveyObject.abortController?.abort();
      questionsObjet.abortController?.abort();
    };
  }, []);

  return (
    <div className="px-3">
      <div className="d-flex justify-content-center pt-4">
        <div className={`mb-5 ${style.surveyCtnr}`}>
          {(questionsObjet.isLoading || surveyObject.isLoading) && (
            <p>Chargement en cours</p>
          )}
          {(surveyObject.data?.data && questionsObjet.data?.data) &&(
            <>
            <div className={`card p-4 ${style.header}`}>
              <h1 className="text-white">{surveyObject.data?.data.title}</h1>
              <p className={`text-white ${style.description}`}>{surveyObject.data?.data.description}</p>
            </div>
            <Formik
              initialValues={initValues}
              validationSchema={Yup.object(schema)}
              onSubmit={(values) => {
                const answerObject = formatAnswerObject(
                  idSurvey,
                  values,
                  questionsObjet.data.data
                );
                const execAsync = async () => {
                  setSubmiting(true)
                  try {
                    const response = await createAnswers(answerObject);
                    console.log(response.data);
                    navigate("/completed/" + response.data.participant.token);
                  } catch (error) {
                    let message = error.message;
                    const errorData = error?.response?.data;
                    if (errorData) {
                      message = errorData.message;
                    }
                    console.log(message);
                  } finally{
                    setSubmiting(false)
                  }
                };
                execAsync();
              }}
            >
              <Form>
                {questionsObjet.data.data.map((question, index) => (
                  <QuestionCard question={question} key={index} total={questionsObjet.data.data.length}></QuestionCard>
                ))}
                <button type="submit" className="btn btn-lg btn-primary" disabled={submiting}>{submiting? "Envoie en cours" : "Envoyer"}</button>
              </Form>
            </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Survey;
