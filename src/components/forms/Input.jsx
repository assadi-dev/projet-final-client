const Input = ({type, required, isEmail, options, name}) => {
    let input = {
        name: name,
        type: null,
        required: required? true : false,
        min: 0,
        max: 0
    }

    switch (type) {
        case "C":
            input.type = "number"
            input.min = 0
            break;
        case "B":
            input.type = isEmail? "email" : "text"
            break;
        case "A":
            input.type = "radio"
            break;
        default:
            break;
    }

    if(options.length > 1) {
        input = options.map((option, index) => (
            <div key={index}>
                <input type={input.type} required={input.required} id={input.name+index} name={input.name}/>
                <label htmlFor={input.name+index}>{option.proposition}</label>
            </div>            
        ))
    }else{
        input = <input type={input.type} required={input.required} name={input.name} id={input.name} min={input.min}/>
    }
    return input
}

export default Input