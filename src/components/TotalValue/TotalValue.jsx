import './TotalValue.css'

export function TotalValue({chart, totalValue}) {

  
  function toFixed(value, precision) {
    var power = Math.pow(10, precision || 2);
    return String(Math.round(value * power) / power);
}
  return (
  <div className='total_container'>
  <span>    <h1>Total</h1>
</span>
    <p>R$ {toFixed(chart.reduce((acc, curr) => acc + curr.quantity * parseFloat(curr.price.replace(',','.')), 0))}</p>
  </div>
  )
}