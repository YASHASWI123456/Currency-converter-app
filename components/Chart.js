import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button ,Dimensions} from 'react-native';

const API_KEY = '93abdd4186aad8cb4cd6db152ef7d7cf'; // Replace this with your API key
// Exchange rate chart between the 2 currencies:
const Chart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  


  // ...
  
  return (
    <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      <Text>From Currency:</Text>
      {/* ... */}
    
    </View>
  );
};

export default Chart;
