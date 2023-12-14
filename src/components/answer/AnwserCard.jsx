import React from 'react'

const AnwserCard = ({answer}) => {
    let result = ""
    if(answer.question.question_type == 'A'){
        result = <>
            {answer.question.propositions.map((option) => (
                (option.proposition == answer.value)? <p key={option.id}>&#11093; {option.proposition}</p> : <p key={option.id}>&#128280; {option.proposition}</p>
            ))}
        </>
    }else{
        result = <p>{answer.value}</p>
    }
    return (
        <div>
            <div>
                <p><span>{answer.question.question_number}</span> <span>{answer.question.question_body}</span></p>
            </div>
            <div>
                {result}
            </div>
        </div>
    )
}

export default AnwserCard