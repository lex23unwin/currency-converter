import React from 'react';

export default function CurrencyRow({ currencyOptions, startingAmount, isFromCurrencyRow, setFromCurrencyCode, setToCurrencyCode, fromCurrencyCode, toCurrencyCode, finishingAmount, setStartingAmount, setFinishingAmount }) {

    return (
        <div className="currencyRowContainer">
            <input type="number" 
                value={isFromCurrencyRow ? startingAmount : finishingAmount}
                onChange={(e) => isFromCurrencyRow ? setStartingAmount(e.target.value) 
                    : setFinishingAmount(e.target.value)}
                readOnly={!isFromCurrencyRow} />
            <select
                value={isFromCurrencyRow ? fromCurrencyCode : toCurrencyCode} 
                onChange={(e) => isFromCurrencyRow ? setFromCurrencyCode(e.target.value) :
                 setToCurrencyCode(e.target.value)}>
                {currencyOptions.map((eachOption) => (
                    <option key={eachOption.code} value={eachOption.code}>
                        {eachOption.code}
                    </option>
                ))}
            </select>
        </div>
    );
}
