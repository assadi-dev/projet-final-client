import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useClientFetchData from '../../../hook/useClientFetchData'
import { date } from 'yup'
import AnwserCard from '../../../components/answer/AnwserCard'

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
        <>
            {(survey.isLoading || answers.isLoading) && <p>Chargment en cours</p>}
            {
                (survey.data?.data && answers.data?.data) && 
                <div>
                    <div>
                        <h1>{survey.data.data.title}</h1>
                        <p>{survey.data.data.description}</p>
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
        </>
    )
}

export default AnswerView