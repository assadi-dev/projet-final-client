import { useParams } from "react-router-dom"

const Completed = () => {
    const {token} = useParams()
    return <div>
            <p>Merci d'avoir participer à ce sondage</p>
            <p>Vous pourrez consulter ultérieurement vos réponses via ce lien: <a href={`http://localhost:5173/${token}`}>http://localhost:5173/{token}</a></p>
        </div>
}

export default Completed