import Input from "../forms/Input"

const QuestionCard = ({question}) => {
    return (
        <div>
            <p><span>{question.question_number}</span> <span>{question.question_body}</span></p>
            <div>
                <Input type={question.question_type} isEmail={question.is_email} options={question.propositions} 
                name={"q"+question.id} max={question.max_val}></Input>
            </div>
        </div>
    )
}

export default QuestionCard