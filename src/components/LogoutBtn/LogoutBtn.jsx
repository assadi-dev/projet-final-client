import React, { useTransition } from "react";
import { revokeToken } from "../../services/api/authApi";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const resetAction = async () => {
    startTransition(() => revokeToken());
    navigate("/login", { replace: true });
  };

  const TEXT_BTN = isPending ? "Deconnexion en cours" : "Déconnexion";

  return (
    <button type="button" onClick={resetAction}>
      {TEXT_BTN}
    </button>
  );
};

export default LogoutBtn;
