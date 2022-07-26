import "./MyAdoptions.css";
import "../MyPets/MyPets.css";
import { useState, useEffect, Navigate } from "react";
import api from "../../../utils/api";
import { RoundedImage } from "../../RoundedImage";
import { useFlashMessage } from "../../../hooks/useFlashMessage";
import { Button, MyAdoptionsContainer } from "../../Button/MyAdoptionsContainer";
import { TotalValue } from "../../TotalValue/TotalValue";

export function MyAdoptions() {
  const [chart, setChart] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
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
  }, [token, setFlashMessage]);


  async function deleteProduct({_id}) {
  
    try {
      await api.delete(`/pets/myadoptions/${_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFlashMessage("Produto deletado com sucesso", "success");
    } catch (error) {
      console.log(error)
    }
  }

  async function downProduct(pet) {
    try {
      await api.patch(`/pets/myadoptions/cart/down/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }  
      });
        setFlashMessage("Produto atualizado com sucesso", "success");
     } catch (error) {
      console.log(error)
    }
      
  }

  async function upProduct ( pet ) {
 
    try {
      await api.patch(`/pets/myadoptions/cart/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }  
      });
        setFlashMessage("Produto atualizado com sucesso", "success");
     } catch (error) {
      console.log(error)
    }
      
  }

    function totalValueCart(value) {
      console.log(value)
    }
    return (
    <>
      <section>
        <div className="petlist_header">
          <h1>Minhas Compras</h1>
        </div>
        <div className="petlist_container">
          {(chart.length > 0 || undefined) &&
            chart.map((pet) => (
              <MyAdoptionsContainer 
              key={pet._id} 
              pet={pet} 
              deleteProduct={deleteProduct} 
              upProduct={upProduct}
              downProduct = {downProduct}
              quantity = {pet.quantity}
              price = {pet.price}
              total = {totalValueCart}
      
               /> ))}
          <TotalValue chart={chart} className='petlist_container'/>

          {(chart.length===0 || undefined) && <p>Ainda não há produtos no carrinho!</p>}
        </div>
      </section>
    </>
  );
}
