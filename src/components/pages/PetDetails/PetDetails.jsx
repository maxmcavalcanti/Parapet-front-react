import "./PetDetails.css";
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFlashMessage } from "../../../hooks/useFlashMessage";
import "react-slideshow-image/dist/styles.css";

export function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(`/pets/schedule/${pet._id}`, {
        Authorization: `Bearer ${JSON.parse(token)}`,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });
    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      {pet.name && (
        <section className="pet_details_container">
          <div className="left_detail">
            <div className="pet_details_header">
              <h1>{pet.name}</h1>
            </div>
            <div className="pet_images">
              {pet.images.map((image, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                  alt={pet.name}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="right_detail">
            {pet.age && (
              <p>
                <span className="bold">Idade:</span>
                {pet.age}ano(s)
              </p>
            )}
            {pet.weight && (
              <p>
                <span className="bold">Peso:</span>
                {pet.weight}kg
              </p>
            )}

            {pet.description && (
              <p>
                <span className="bold">Descrição:</span>
                {pet.description}
              </p>
            )}

            <p>
              <span className="bold">Preço:</span>
              {pet.price}
            </p>

            {token ? (
              <button onClick={schedule}>Adicionar ao carrinho</button>
            ) : (
              <p>
                {" "}
                Voce precisa <Link to="/register">criar uma conta</Link> para
                adicionar ao carrinho
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
