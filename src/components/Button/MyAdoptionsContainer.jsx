import { RoundedImage } from "../RoundedImage";
import './MyAdoptionsContainer.css'
import {PlusCircle, MinusCircle} from 'phosphor-react'

export function MyAdoptionsContainer ({pet,upProduct,deleteProduct, downProduct, quantity, price, totalValue}) {

  function handleUpProduct () {
    upProduct(pet)
  }
  function handleDeleteProduct () {
    deleteProduct(pet)
  }
  
  function handleDownProduct() {
    downProduct(pet)
  }
 
  function toFixed(value, precision) {
    var power = Math.pow(10, precision || 2);
    return String(Math.round(value * power) / power);
}
  return (
    <div 
    className="petlist_row">
      <RoundedImage
        src={`${process.env.REACT_APP_API}/images/pets/${pet.image[0]}`}
        alt={pet.name}
        width="px75"
        id={pet._id}

      />
      <span className="bold">{pet.name}</span>
      <div className="action_buttons_container">
      <div className="actions">
        <div className="quantity">
        {<p>R$ {toFixed(quantity * parseFloat(price.replace(',','.')) )}</p>}
        {<p>Quantidade: {quantity}</p>}
        </div>
      </div>

      <div className="action_buttons">
      <span><button onClick={handleUpProduct} ><PlusCircle size={24}/></button></span>
      <span><button onClick={handleDownProduct}><MinusCircle size={24}/></button></span>
      </div>
      <span><button onClick={handleDeleteProduct} className='delete_button'>Excluir</button></span>
      </div>
    </div>
  )
}