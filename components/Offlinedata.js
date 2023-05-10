//Offline mode with last live data when the user was online:
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, NetInfo } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const API_KEY = 'your_api_key'; // Replace this with your API key

const Offlinedata = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  const [chartData, setChartData] = useState({});
  const [pinnedPairs, setPinnedPairs] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Load pinned pairs from AsyncStorage
    AsyncStorage.getItem('pinnedPairs')
      .then((pairs) => {
        if (pairs) {
          setPinnedPairs(JSON.parse(pairs));
        }
      })
      .catch((error) => console.error(error));

    // Check network connection status
    NetInfo.fetch().then((state) => {
      setIsOnline(state.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOnline) {
      fetch(`https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}&base=${fromCurrency}&symbols=${toCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          const rate = data.response.rates[toCurrency];
          setExchangeRate(rate);

          // Create
          const chartData = {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [
              {
                data: [1, rate, rate * 2, rate * 3, rate * 4, rate * 5, rate * 6],
              },
            ],
          };
          setChartData(chartData);
        })
        .catch((error) => console.error(error));
    } else {
      // Load exchange rate and chart data from AsyncStorage
      AsyncStorage.multiGet(['exchangeRate', 'chartData'])
        .then((data) => {
          const rate = JSON.parse(data[0][1]);
          const chartData = JSON.parse(data[1][1]);
          setExchangeRate(rate);
          setChartData(chartData);
        })
        .catch((error) => console.error(error));
    }
}, [fromCurrency, toCurrency, isOnline]);

useEffect(() => {
// Save exchange rate and chart data to AsyncStorage
AsyncStorage.multiSet([
['exchangeRate', JSON.stringify(exchangeRate)],
['chartData', JSON.stringify(chartData)],
])
.catch((error) => console.error(error));
}, [exchangeRate, chartData]);

// ...

return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
{/* ... */}
{isOnline ? (
<LineChart
data={chartData}
width={Dimensions.get('window').width - 20}
height={200}
chartConfig={{
backgroundGradientFrom: '#fff',
backgroundGradientTo: '#fff',
decimalPlaces: 4,
color: (opacity = 1) => rgba(0, 0, 0, 1),
labelColor: (opacity = 1) => rgba(0, 0, 0, 1),
}}
/>
) : (
<Text>No chart data available. You are offline.</Text>
)}
</View>
);
};

export default Offlinedata;