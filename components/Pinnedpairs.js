//Pin most searched currency pairs:
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const API_KEY = 'your_api_key'; // Replace this with your API key

const Pinnedpairs= () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setexchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  const [chartData, setChartData] = useState({});
  const [pinnedPairs, setPinnedPairs] = useState([]);

  useEffect(() => {
    // Load pinned pairs from AsyncStorage
    AsyncStorage.getItem('pinnedPairs')
    .then((pairs) => {
    if (pairs) {
    setPinnedPairs(JSON.parse(pairs));
    }
    })
    .catch((error) => console.error(error));
    }, []);
   // Pin the current currency pair
    const pinPair = () => {
    const pair = `${fromCurrency}_${toCurrency}`;
    const newPinnedPairs = [...pinnedPairs, pair];
    // Save pinned pairs to AsyncStorage
AsyncStorage.setItem('pinnedPairs', JSON.stringify(newPinnedPairs))
.then(() => setPinnedPairs(newPinnedPairs))
.catch((error) => console.error(error));
};

// ...

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{/* ... */}
<Button title="Pin" onPress={pinPair} />
<Text>Pinned Pairs:</Text>
{pinnedPairs.map((pair, index) => (
<Text key={index}>{pair}</Text>
))}
</View>
);
};

export default Pinnedpairs;