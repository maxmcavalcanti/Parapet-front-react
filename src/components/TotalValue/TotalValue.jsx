export function TotalValue({chart}) {
  return (<div >
    <h1>Total</h1>
    <p>R$ {chart.reduce((acc, curr) => acc + curr.quantity * parseFloat(curr.price.replace(',','.')), 0)}</p>
    
    
  </div>)
}