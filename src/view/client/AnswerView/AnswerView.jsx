import React from 'react'
import { useParams } from 'react-router-dom'

const AnswerView = () => {
    const {token} = useParams()
    console.log(token);
    return (
        <div>AnswerView</div>
    )
}

export default AnswerView