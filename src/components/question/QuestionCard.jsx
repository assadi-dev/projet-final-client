import Input from "../forms/Input"

const QuestionCard = ({question, formik}) => {
    //console.log(formik)
    Object.defineProperty(formik.initialValues, "q"+question.id, {value: ""}) 
    return (
        <div>
            <p><span>{question.question_number}</span> <span>{question.question_body}</span></p>
            <div>
                <Input type={question.question_type} /* required={question.required} */ isEmail={question.is_email} options={question.propositions} 
                name={"q"+question.id} formik={formik}></Input>
            </div>
        </div>
    )
}

export default QuestionCard