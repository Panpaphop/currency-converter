import { useEffect, useState } from 'react'
import exchanging from './image/exchanging.png'
import './App.css'
import CurrencyComponent from './components/CurrencyComponent'

function App() {

  const [currencyChoice, setCurrencyChoice] = useState([])
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("THB")

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);

  const [checkFromCurrency, setCheckFromCurrency] = useState(true)

  let fromAmount, toAmount 

  if(checkFromCurrency){
    fromAmount = amount
    toAmount = (amount*exchangeRate).toFixed(2)
  }else{
    toAmount = amount
    fromAmount = (amount/exchangeRate).toFixed(2)
  }
  

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setCurrencyChoice([...Object.keys(data.rates)])
      setExchangeRate(data.rates[toCurrency])
      })
  },[fromCurrency, toCurrency])

  const amountFromCurrency = (e)=>{
    setAmount(e.target.value)
    setCheckFromCurrency(true)
  }
  const amountToCurrency = (e)=>{
    setAmount(e.target.value)
    setCheckFromCurrency(false)
  }
  return (
    <div>
      <img src={exchanging} alt="logo" className='money-img'></img>
      <h1>Currency Converter (API)</h1>
      <div className='container'></div>
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount = {fromAmount}
          onChangeAmount = {amountFromCurrency}
        />
      <div className='equal'>=</div>
        <CurrencyComponent 
          currencyChoice={currencyChoice} 
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount = {toAmount}
          onChangeAmount = {amountToCurrency}
        />
    </div>
  )
}

export default App
