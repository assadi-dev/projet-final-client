import React from "react";
import { Link } from "react-router-dom";
import style from "./home.module.css"

const HomeView = () => {
  return <div className="d-flex justify-content-center align-items-center h-100 px-3">
    <div className={`card text-center p-5 ${style.homeCard}`}>
      <h1 className="mb-4">Bienvenue chez BigScreen</h1>
      <p className="lead">Nous sommes ravis de vous accueillir sur notre plateforme dédiée à la collecte de vos précieuses opinions.</p>
      <p className="lead mb-4">En partageant vos pensées à travers ce sondage, vous contribuez à influencer des décisions importantes. Votre voix fait la différence, et chaque réponse compte.</p>
      <p>{<Link to={"/survey/1"} className="btn btn-primary">Participer au sondage</Link>}</p>
    </div>
  </div>
};

export default HomeView;
