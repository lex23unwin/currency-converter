import './App.css';
import CurrencyRow from './CurrencyRow.js'
import React, { useEffect, useState } from 'react'
import currencyCalculation from './CurrencyCalculation.js';

const BASE_URL = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_sOh3Oy0Oviyr7QAkcTsv7Y8ORyXWQNkIvAduzvaZ&currencies=EUR%2CUSD%2CCAD'

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrencyCode, setFromCurrencyCode] = useState('')
  const [toCurrencyCode, setToCurrencyCode] = useState('')
  const [startingAmount, setStartingAmount] = useState(0)
  const [finishingAmount, setFinishingAmount] = useState(0)

  useEffect(() => {
    console.log("inside useEffect1")

    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const options = Object.keys(data.data).map(key => ({
          code: key,
          value: data.data[key].value
        }));
        setCurrencyOptions(options);
      })
      .catch(error => console.log('Error:', error));
  }, []);

  useEffect(() => {
    const fromCurrencyOption = currencyOptions.find(option => option.code === fromCurrencyCode);
    const toCurrencyOption = currencyOptions.find(option => option.code === toCurrencyCode);

    const fromCurrencyCodeValue = fromCurrencyOption.value;
    const toCurrencyCodeValue = toCurrencyOption.value;

    const result = currencyCalculation(fromCurrencyCodeValue, toCurrencyCodeValue, startingAmount);

    setFinishingAmount(result)
  }, [fromCurrencyCode, toCurrencyCode, startingAmount, currencyOptions]);

  return (
    <>
      <div className="appContainer">
        <h1>Convert</h1>
        <div className="currencyContainer">
          <div style={{ fontSize: "48px" }}>From:</div>
          <CurrencyRow 
              fromCurrencyCode={fromCurrencyCode} 
              currencyOptions={currencyOptions} 
              isFromCurrencyRow={true}
              setFromCurrencyCode={setFromCurrencyCode} 
              setStartingAmount={setStartingAmount}
              startingAmount={startingAmount}
              />
          <div style={{ fontSize: "48px" }}>To:</div>
          <CurrencyRow 
              toCurrencyCode={toCurrencyCode}
              currencyOptions={currencyOptions} 
              isFromCurrencyRow={false}
              setToCurrencyCode={setToCurrencyCode}
              finishingAmount={finishingAmount}
              />
        </div>
      </div>
    </>
  );
}
