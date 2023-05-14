import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;
const API_KEY = '93abdd4186aad8cb4cd6db152ef7d7cf'; // Replace this with your API key
var myHeaders = new Headers();
myHeaders.append("apikey", "9xeIW7d6KAdGFSzazOKqjYxKgOEOlQtA");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  const [chartData, setChartData] = useState({});
 // https://api.currencybeacon.com/v1/convert/?api_key=&from=USD&to=INR&amount=1
  useEffect(() => {
    
    fetch(`https://api.currencybeacon.com/v1/latest?api_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=1`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.response.rates[toCurrency];
        setExchangeRate(rate);
      })
      .catch((error) => console.error(error));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${API_KEY}&type=fiat`)
      .then((response) => response.json())
      .then((data) => {
        const currenciesArray = Object.keys(data.response.fiats);
        setCurrencies(currenciesArray);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch(`https://api.currencybeacon.com/v1/latest?api_key=${API_KEY}&base=${fromCurrency}&symbols=${toCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.response.rates[toCurrency];
        setExchangeRate(rate);

        // Create data for chart
        const now = new Date();
        const chartData = {
          labels: [now.getDate(),now.getDate()-1,now.getDate()-2,now.getDate()-3,now.getDate()-4,now.getDate()-5],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
             // data: [1 / rate, 2 / rate, 3 / rate, 4 / rate, 5 / rate],
              color: () => `rgba(0, 0, 255, 1)`, // blue
              strokeWidth: 2,
            },
          ],
        };
        setChartData(chartData);
      })
      .catch((error) => console.error(error));
  }, [fromCurrency, toCurrency]);

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
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"#F1F1F1" }}>
      <View style={{flex:1,marginTop:20,alignItems:"stretch",}}>
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
      <View style={{flex:1,marginTop:20,alignItems:"stretch",}}>
      <View>
  {/* <Text>Bezier Line Chart</Text> */}
  <LineChart
    data={chartData}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
      </View>
    </View>
   </>
  );
};

export default App;
