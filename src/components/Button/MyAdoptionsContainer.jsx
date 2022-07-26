import { RoundedImage } from "../RoundedImage";

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

  function x() {
    totalValue(pet)
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
      <div className="contacts">
      </div>
      <div className="actions">
        {<p>R$ {quantity * parseFloat(price.replace(',','.')) }</p>}
        {<p>Quantidade: {quantity}</p>}
      </div>

      <span><button onClick={handleUpProduct} >+</button></span>
      <span><button onClick={handleDownProduct}>-</button></span>
      <span><button onClick={handleDeleteProduct}>Excluir</button></span>
    </div>
  )
}