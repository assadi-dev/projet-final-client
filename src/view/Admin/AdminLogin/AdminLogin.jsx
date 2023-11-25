import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("email non valide").required("Email requis"),
  password: yup
    .string()
    .required("champs requis")
    .min(6, "le mot de passe doit contenir au moins 6 caracteres"),
});

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const submitForm = async (values) => {
    console.log(values);
    navigate("/administration", { replace: true });
  };

  return (
    <div>
      <p>AdminLogin</p>
      <form onSubmit={handleSubmit(submitForm)}>
        <input type="email" {...register("email")} />
        <small>{errors.email && errors.email.message}</small>
        <input type="password" {...register("password")} />
        <small>{errors.password && errors.password.message}</small>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
