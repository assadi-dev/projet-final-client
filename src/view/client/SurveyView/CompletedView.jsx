import { useParams } from "react-router-dom"

const CompletedView = () => {
    const {token} = useParams()
    return <div>
            <p>Merci d'avoir participer à ce sondage</p>
            <p>Vous pourrez consulter ultérieurement vos réponses via ce lien: <a href={`http://localhost:5173/answers/${token}`}>http://localhost:5173/answers/{token}</a></p>
        </div>
}

export default CompletedView