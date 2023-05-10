import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const API_KEY = 'your_api_key'; // Replace this with your API key

// Exchange rate chart between the 2 currencies:
const Chart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch(`https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}&base=${fromCurrency}&symbols=${toCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.response.rates[toCurrency];
        setExchangeRate(rate);

        // Create data for chart
        const chartData = {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              data: [1 / rate, 2 / rate, 3 / rate, 4 / rate, 5 / rate],
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue
              strokeWidth: 2,
            },
          ],
        };
        setChartData(chartData);
      })
      .catch((error) => console.error(error));
  }, [fromCurrency, toCurrency]);

  // ...
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>From Currency:</Text>
      {/* ... */}
      <LineChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 4,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Chart;
