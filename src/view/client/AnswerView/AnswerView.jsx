import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useClientFetchData from '../../../hook/useClientFetchData'
import { date } from 'yup'
import AnwserCard from '../../../components/answer/AnwserCard'
import style from "./answer.module.css"

const AnswerView = () => {
    // récupération du token en paramètre
    const {token} = useParams()
    // récupération des réponses
    const answers = useClientFetchData(`/client/answers/${token}`, null)
    const survey = useClientFetchData(`/client/surveys/survey/${token}`, null)

    useEffect(() => {
        answers.fetch(`/client/answers/${token}`)
        survey.fetch(`/client/surveys/survey/${token}`)
        return () => {
            answers.abortController?.abort();
            survey.abortController?.abort();
        };
    }, [])
    console.log(answers, survey);
    return (
        <div className="px-3">
            <div className="d-flex justify-content-center pt-4">
                <div className={`mb-5 ${style.answerCtnr}`}>
                {(survey.isLoading || answers.isLoading) && <p>Chargment en cours</p>}
                {
                    (survey.data?.data && answers.data?.data) && 
                    <div>
                        <div className={`card p-4 ${style.header}`}>
                            <h1 className="text-white">{survey.data.data.title}</h1>
                            <p className={`text-white ${style.description}`}>Merci de nous avoir partagé vos opinions <br/> Voici vos réponses</p>
                        </div>
                        <div>
                            {
                                answers.data.data.map((answer) => (
                                    <AnwserCard key={answer.id} answer={answer} />
                                ))
                            }
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

export default AnswerView