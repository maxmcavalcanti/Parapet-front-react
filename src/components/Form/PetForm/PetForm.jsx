import "./PetForm.css";
import "../Form.css";

import { useState } from "react";
import { Input } from "../Input";
import { Select } from "../Select";

export function PetForm({ handleSubmit, petData, btnText }) {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const color = ["Gato", "Cachorro", "Outros"];

  function onFileChange(e) {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  }
  function onHandleChange(e) {
    setPet({ ...pet, [e.target.name]: [e.target.value] });
  }
  function onHandleColor(e) {
    setPet({ ...pet, color: [e.target.options[e.target.selectedIndex].text] });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(pet);
  }

  return (
    <form onSubmit={submit} className="form_container">
      <div className="preview_pet_images">
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                key={`${pet.name}+${index}`}
                alt={pet.name}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                key={`${pet.name}+${index}`}
                alt={pet.name}
              />
            ))}
      </div>
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Nome do Produto"
        type="text"
        name="name"
        handleOnChange={onHandleChange}
        placeholder="Digite o nome do Pet"
        value={pet.name || ""}
      />
      <Input
        text="Idade recomendada para o produto"
        type="text"
        name="age"
        handleOnChange={onHandleChange}
        placeholder="Digite a idade recomendada para o produto"
        value={pet.age || ""}
      />
      <Input
        text="Peso total do produto"
        type="number"
        name="weight"
        handleOnChange={onHandleChange}
        placeholder="Digite o peso do produto"
        value={pet.weight || ""}
      />
      <Input
        text="Preço do produto"
        type="String"
        name="price"
        handleOnChange={onHandleChange}
        placeholder="Digite o preço do produto"
        value={pet.price || ""}
      />
      <Input
        text="Descrição do produto"
        type="String"
        name="description"
        handleOnChange={onHandleChange}
        placeholder="Descreva o produto"
        value={pet.description || ""}
      />
      <Select
        name="color"
        text="Tipo de Pet"
        options={color}
        handleOnChange={onHandleColor}
        value={pet.color || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}
