import api from "../../utils/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Home.css";

export function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section>
      <div className="pet_home_header">
        <h1>Conheça nossos produtos</h1>
      </div>
      <div className="pet_container">
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet.id} className="pet_card">
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className="pet_card_img"
              ></div>
              <div className="pet_name">
                <h3>{pet.name}</h3>
              </div>
              <p>
                <span className="bold">Preço:</span>
                R$ {pet.price}
              </p>
              {pet.available ? (
                <>
                  <div className="details">
                    <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
                  </div>
                  <div className="details chart">
                    <Link to={`/pet/${pet._id}`}>Adicionar ao carrinho</Link>
                  </div>
                </>
              ) : (
                <div className="details">
                  <p className="adopted_text">Fora de estoque!</p>
                </div>
              )}
            </div>
          ))}
        {pets.length === 0 && <p>Não há pets cadastrados no momento</p>}
      </div>
    </section>
  );
}
