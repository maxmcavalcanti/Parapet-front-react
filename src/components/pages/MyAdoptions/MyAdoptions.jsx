import "./MyAdoptions.css";
import "../MyPets/MyPets.css";
import { useState, useEffect } from "react";
import api from "../../../utils/api";
import { RoundedImage } from "../../RoundedImage";
import { QuantityPicker } from "react-qty-picker";
import { useFlashMessage } from "../../../hooks/useFlashMessage";

export function MyAdoptions() {
  const [chart, setChart] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const [value, setValue] = useState(0);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get(`/pets/myadoptions`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setChart(response.data.chart);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  async function deleteProduct(event, id) {
    event.preventDefault();
    let msgType = "success";

    const data = await api
      .patch(`/pets/myadoptions/62a3c75840569b4189b4e457`, {
        Headers: { Authorization: `Bearer ${JSON.parse(token)}` },
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
      <section>
        <div className="petlist_header">
          <h1>Minhas Compras</h1>
        </div>
        <div className="petlist_container">
          {chart.length > 0 &&
            chart.map((pet) => (
              <div key={chart._id} className="petlist_row">
                <RoundedImage
                  src={`${process.env.REACT_APP_API}/images/pets/${pet.image[0]}`}
                  alt={pet.name}
                  width="px75"
                />
                <span className="bold">{pet.name}</span>
                <div className="contacts">
                  {/* <QuantityPicker
                    key={pet._id}
                    value={pet.quantity}
                    onChange={updateCart}
                  /> */}
                </div>
                <div className="actions">
                  {<p>R$ {parseFloat(pet.price)}</p>}
                </div>
                <button onClick={deleteProduct}>Excluir</button>
              </div>
            ))}
          {chart.length === 0 && <p>Ainda não há produtos no carrinho!</p>}
        </div>
      </section>
    </>
  );
}
