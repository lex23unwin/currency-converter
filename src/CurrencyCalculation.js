export default function currencyCalculation(fromCurrencyValue, toCurrencyValue, startingAmount) {
    return (startingAmount * (toCurrencyValue / fromCurrencyValue))
  }