import './MyAdoptions.css'
import '../MyPets/MyPets.css'
import { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useFlashMessage } from '../../../hooks/useFlashMessage'
import { MyAdoptionsContainer } from '../../Button/MyAdoptionsContainer'
import { TotalValue } from '../../TotalValue/TotalValue'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  Flashlight,
  Money,
} from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function MyAdoptions() {
  const [chart, setChart] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  const [totalValue, setTotalValue] = useState(0)
  const navigate = useNavigate()

  const { register, handleSubmit, watch } = useForm()

  useEffect(() => {
    api
      .get(`/pets/myadoptions`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setChart(response.data.chart)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [token])
  async function deleteProduct({ _id }) {
    try {
      await api.delete(`/pets/myadoptions/${_id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })

      setFlashMessage('Produto deletado com sucesso', 'success')
    } catch (error) {
      console.log(error)
    }
  }
  async function downProduct(pet) {
    try {
      await api.patch(`/pets/myadoptions/cart/down/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
    setChart(
      chart.map((item) =>
        item._id === pet._id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }
  async function upProduct(pet) {
    try {
      await api.patch(`/pets/myadoptions/cart/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
    } catch (error) {
      console.log(error)
    }
    setChart(
      chart.map((item) =>
        item._id === pet._id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }
  function handleTotalValue(chart) {
    setTotalValue(
      chart.reduce(
        (acc, curr) =>
          acc + curr.quantity * parseFloat(curr.price.replace(',', '.')),
        0,
      ),
    )
  }
  function handleCreateNewOrder(data) {
    if (!isButtonClicked) {
      alert('Escolha o método de pagamento')
      return
    }
    setAddress((state) => {
      return {
        ...state,
        cep: data.cep,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
      }
    })

    // console.log(address)
    navigate('/confirmOrder')
  }
  const [address, setAddress] = useState(() => {
    const addressStoredAsJSON = localStorage.getItem(
      '@parapet: address-state-1.0.0',
    )

    if (addressStoredAsJSON) {
      return JSON.parse(addressStoredAsJSON)
    }
    return []
  })

  function handleCreditCard() {
    setAddress((state) => {
      return {
        ...state,
        payment: 'Cartão de Crédito',
      }
    })
    checkButton()
  }
  function handleDebitCard() {
    setAddress((state) => {
      return {
        ...state,
        payment: 'Cartão de Débito',
      }
    })
    checkButton()
  }
  function handleMoney() {
    setAddress((state) => {
      return {
        ...state,
        payment: 'Dinheiro ou PIX',
      }
    })
    checkButton()
  }
  useEffect(() => {
    const addressJSON = JSON.stringify(address)

    localStorage.setItem('@parapet: address-state-1.0.0', addressJSON)
  }, [address])
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  function checkButton() {
    setIsButtonClicked(true)
  }
  console.log(address)
  return (
    <>
      <section className="section_container">
        <div className="petlist_header">
          <h1>Minhas Compras</h1>
        </div>
        <div className="compras_container">
          <div className="form_container">
            <h2 style={{ color: '#16479d' }}>Endereço de entrega</h2>
            <form id="adressForm" onSubmit={handleSubmit(handleCreateNewOrder)}>
              <input
                style={{ width: '50%' }}
                type={'text'}
                placeholder="CEP"
                required
                id="cep"
                {...register('cep', {
                  onChange: (e) =>
                    setAddress((state) => {
                      return { ...state, cep: e.target.value }
                    }),
                })}
                defaultValue={'' || address.cep}
              />
              <input
                style={{ width: '90%' }}
                placeholder="Rua"
                required
                id="rua"
                {...register('rua', {
                  onChange: (e) =>
                    setAddress((state) => {
                      return { ...state, rua: e.target.value }
                    }),
                })}
                defaultValue={'' || address.rua}
              />
              <div>
                <input
                  style={{ width: '25%' }}
                  placeholder="N°"
                  required
                  id="numero"
                  {...register('numero', {
                    onChange: (e) =>
                      setAddress((state) => {
                        return { ...state, numero: e.target.value }
                      }),
                  })}
                  defaultValue={'' || address.numero}
                />
                <input
                  style={{ width: '60%' }}
                  placeholder="Complemento"
                  id="complemento"
                  {...register('complemento', {
                    onChange: (e) =>
                      setAddress((state) => {
                        return { ...state, complemento: e.target.value }
                      }),
                  })}
                  defaultValue={'' || address.complemento}
                />
              </div>
              <div>
                <input
                  style={{ width: '90%' }}
                  placeholder="Bairro"
                  required
                  id="bairro"
                  {...register('bairro', {
                    onChange: (e) =>
                      setAddress((state) => {
                        return { ...state, bairro: e.target.value }
                      }),
                  })}
                  defaultValue={'' || address.bairro}
                />
                <input
                  style={{ width: '60%' }}
                  placeholder="Cidade"
                  required
                  id="cidade"
                  {...register('cidade', {
                    onChange: (e) =>
                      setAddress((state) => {
                        return { ...state, cidade: e.target.value }
                      }),
                  })}
                  defaultValue={'' || address.cidade}
                />
                <input
                  style={{ width: '25%' }}
                  placeholder="UF"
                  required
                  id="uf"
                  {...register('uf', {
                    onChange: (e) =>
                      setAddress((state) => {
                        return { ...state, uf: e.target.value }
                      }),
                  })}
                  defaultValue={'' || address.uf}
                />
                <h2 style={{ color: '#16479d' }}>Opções de pagamento</h2>
                <div>
                  <div>
                    <div>
                      <p style={{ marginBottom: '10px' }}>
                        O pagamento é feito na entrega. Escolha a forma que
                        deseja pagar
                      </p>
                    </div>
                  </div>
                  <div className="button_container">
                    <button
                      type="button"
                      className="button"
                      onClick={handleCreditCard}
                    >
                      <CreditCard size={16} color="#16479d" />
                      <p>CARTÃO DE CRÉDITO</p>
                    </button>

                    <button
                      type="button"
                      className="button"
                      onClick={handleDebitCard}
                    >
                      <Bank size={16} color="#16479d" /> <p>CARTÃO DE DEBITO</p>
                    </button>

                    <button
                      type="button"
                      className="button"
                      onClick={handleMoney}
                    >
                      <Money size={16} color="#16479d" />
                      <p>DINHEIRO / PIX</p>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="cart_button_container">
            <div className="cart_container">
              {(chart.length > 0 || undefined) &&
                chart.map((pet) => (
                  <MyAdoptionsContainer
                    key={pet._id}
                    pet={pet}
                    deleteProduct={deleteProduct}
                    upProduct={upProduct}
                    downProduct={downProduct}
                    quantity={pet.quantity}
                    price={pet.price}
                  />
                ))}
              <TotalValue chart={chart} className="total_container" />

              {(chart.length === 0 || undefined) && (
                <p>Ainda não há produtos no carrinho!</p>
              )}
            </div>
            <button type="submit" form="adressForm" className="btn_confirm">
              CONFIRMAR PEDIDO
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
