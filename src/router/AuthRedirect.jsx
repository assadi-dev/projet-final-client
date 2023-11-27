import { Outlet, redirect } from "react-router-dom";

/**
 * Gestion des redirection
 * redirection de l'utilisateur en cas de non presence du token
 */
export const useRedirect = () => {
  const TOKEN_STORAGE = localStorage.getItem(
    import.meta.env.VITE_TOKEN_STORAGE
  );
  if (!TOKEN_STORAGE) return redirect("/login");
  console.log("connecté", TOKEN_STORAGE);
  return <Outlet />;
};
