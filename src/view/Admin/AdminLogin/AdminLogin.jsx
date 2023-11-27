import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../../services/api/authApi";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  email: yup.string().email("email non valide").required("Email requis"),
  password: yup
    .string()
    .required("champs requis")
    .min(6, "le mot de passe doit contenir au moins 6 caracteres"),
});

const TOKEN_STORAGE = import.meta.env.VITE_TOKEN_STORAGE;

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setisloading] = React.useState(false);

  const submitForm = async (values) => {
    setisloading(true);
    try {
      const res = await login(values);
      if (res.data.token)
        Cookies.set(TOKEN_STORAGE, res.data.token?.trim(), { expires: 1 });
      location.replace("/administration");
    } catch (error) {
      let meassage = error.message;
      const errorData = error?.response?.data;

      if (errorData) {
        meassage = errorData.message;
      }
      console.log(meassage);
    } finally {
      setisloading(false);
    }
  };

  const TEXT_BTN = isLoading ? "Conexxion en cours" : "connexion";

  return (
    <div>
      <p>AdminLogin</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <input type="email" {...register("email")} />
        <small>{errors.email && errors.email.message}</small>
        <input type="password" {...register("password")} />
        <small>{errors.password && errors.password.message}</small>
        <button type="submit" disabled={isLoading}>
          {TEXT_BTN}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
