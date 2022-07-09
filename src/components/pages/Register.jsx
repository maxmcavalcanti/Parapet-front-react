import { Input } from "../Form/Input";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../Form/Form.css";

import { Context } from "../../context/UserContext";

export function Register() {
  const [user, setUser] = useState({});
  const { register } = useContext(Context);

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    //Enviar o usuario para o banco
    register(user);
  }

  return (
    <section className="form_container">
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          name="name"
          placeholder="Digite seu nome"
          type="text"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone"
          name="phone"
          placeholder="Digite seu telefone"
          type="text"
          handleOnChange={handleChange}
        />
        <Input
          text="E-mail"
          name="email"
          placeholder="Digite seu E-mail"
          type="email"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          name="password"
          placeholder="Digite sua senha"
          type="password"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de Senha"
          name="confirmPassword"
          placeholder="Confirme a sua senha"
          type="password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </section>
  );
}
