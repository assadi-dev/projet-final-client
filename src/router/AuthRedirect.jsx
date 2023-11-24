import { Outlet, redirect } from "react-router-dom";

/**
 * Gestion des redirection
 * redirection de l'utilisateur en cas de non presence du token
 */
export const useRedirect = () => {
  console.log("connecté");
  //return redirect("/login");
  return <Outlet />;
};
