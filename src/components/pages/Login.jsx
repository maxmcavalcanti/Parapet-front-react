import { useState, useContext, useEffect } from "react";
import { Input } from "../Form/Input";
import { Link } from "react-router-dom";
import "../Form/Form.css";

//Context
import { Context } from "../../context/UserContext";

export function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(user);
  }

  return (
    <section className="form_container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          name="email"
          type="email"
          handleOnChange={handleChange}
          placeholder="Digite o seu e-mail"
        />
        <Input
          text="Senha"
          name="password"
          type="password"
          handleOnChange={handleChange}
          placeholder="Digite a sua senha"
        />
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  );
}
