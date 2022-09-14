import { useState } from 'react'
import './ConfirmOrder.css'
import { CurrencyDollar, MapPin, Timer } from 'phosphor-react'
import image from '../../../assets/img/delivery.png'

export function ConfirmOrder() {
  const [addressConfirmed, setAddressConfirmed] = useState(() => {
    const addressStoredAsJSON = localStorage.getItem(
      '@parapet: address-state-1.0.0',
    )

    if (addressStoredAsJSON) {
      return JSON.parse(addressStoredAsJSON)
    }
    return []
  })
  return (
    <div className="OrderContainer">
      <div className="ConfirmedOrderHeader">
        <h1>Uhu! Pedido confirmado</h1>
        <p>Agora é só aguardar que logo seus produtos chegarão!</p>
      </div>
      <div className="OrderAndImageContainer">
        <div className="ConfirmedOrderContainer">
          <div className="OrderContentBox">
            <div className="MapIconContainer">
              <MapPin size={24} weight="fill" color="white" />
            </div>
            <div className="OrderContentTextBox">
              <p>
                Entrega em{' '}
                <strong>
                  {addressConfirmed.rua}, {addressConfirmed.numero}
                </strong>
              </p>
              <p>
                {addressConfirmed.bairro} - {addressConfirmed.cidade},{' '}
                {addressConfirmed.uf}
              </p>
            </div>
          </div>
          <div className="OrderContentBox">
            <div className="TimerIconContainer">
              <Timer size={24} weight="fill" color="white" />
            </div>
            <div className="OrderContentTextBox">
              <p>Previsão de entrega</p>
              <p>
                <strong>60 min - 120 min</strong>
              </p>
            </div>
          </div>
          <div className="OrderContentBox">
            <div className="CurrencyIconContainer">
              <CurrencyDollar size={24} weight="fill" color="white" />
            </div>
            <div className="OrderContentTextBox">
              <p>Pagamento na entrega</p>
              <p>
                <strong>{addressConfirmed.payment}</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="ImageContainer">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  )
}
