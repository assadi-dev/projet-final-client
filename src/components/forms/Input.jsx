import { ErrorMessage, Field } from "formik";

const Input = ({type, isEmail, options, name, min, max}) => {
     let input = {
        name: name,
        type: null,
        min: min,
        max: max
    }

    switch (type) {
        case "B":
            input.type = isEmail? "email" : "text"
            break;
        case "A":
            input.type = "radio"
            break;
        default:
            break;
    }

    let result, optionList = ""
    if (type == 'A') {
        result = <div role="group" aria-labelledby="my-radio-group">
            {
                options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input type={input.type} name={input.name} value={option.id} id={input.name+index}/>
                            {option.proposition}
                        </label> 
                    </div>))
            }
            <ErrorMessage name={input.name} />
        </div>
    }
    if(type == 'B'){
        result = <>
            <Field name={input.name} type={input.type}></Field>
            <ErrorMessage name={input.name} />
        </>
    }
    if(type == 'C'){
        for (let i = 0; i <= max; i++) {
            optionList = <option value={i}>{i}</option>
        }
        result = <>
            <Field name={input.name} as="select">
                {optionList}
            </Field>
        </>
    }
    return result
}

export default Input