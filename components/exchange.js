import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const API_KEY = 'your_api_key'; // Replace this with your API key

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    fetch(`https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}&base=${fromCurrency}&symbols=${toCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.response.rates[toCurrency];
        setExchangeRate(rate);
      })
      .catch((error) => console.error(error));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`https://api.currencyscoop.com/v1/currencies?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const currenciesArray = Object.keys(data.response.fiats);
        setCurrencies(currenciesArray);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleFromCurrencyChange = (value) => {
    setFromCurrency(value);
  };

  const handleToCurrencyChange = (value) => {
    setToCurrency(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleConversion = () => {
    const result = amount * exchangeRate;
    setConvertedAmount(result);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>From Currency:</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleFromCurrencyChange}
        value={fromCurrency}
      />
      <Text>To Currency:</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleToCurrencyChange}
        value={toCurrency}
      />
      <Text>Amount:</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleAmountChange}
        value={amount.toString()}
        keyboardType='numeric'
      />
      <Button title="Convert" onPress={handleConversion} />
      <Text>Exchange Rate: {exchangeRate}</Text>
      <Text>Converted Amount: {convertedAmount}</Text>
    </View>
  );
};

export default App;
