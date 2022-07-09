import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Logo from "../../assets/img/logo.png";

import "./Navbar.css";

//context
import { Context } from "../../context/UserContext";

export function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src={Logo} alt="ParaPet" />
        <h2>ParaPet</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {authenticated ? (
          <>
            <li>
              <Link to="/pet/mypets">Meus produtos</Link>
            </li>
            <li>
              <Link to="/pet/myadoptions">Carrinho</Link>
            </li>
            <li>
              <Link to="/user/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
