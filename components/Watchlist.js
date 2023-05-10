//Watchlist where the user can view their favorite currency pairs:
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, AsyncStorage, NetInfo } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const API_KEY = 'your_api_key'; // Replace this with your API key

const Watchlist = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  const [chartData, setChartData] = useState({});
  const [pinnedPairs, setPinnedPairs] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Load pinned pairs and watchlist from AsyncStorage
    AsyncStorage.multiGet(['pinnedPairs', 'watchlist'])
      .then((data) => {
        const pairs = JSON.parse(data[0][1]);
        const list = JSON.parse(data[1][1]);
        if (pairs) {
          setPinnedPairs(pairs);
        }
        if (list) {
          setWatchlist(list);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Save pinned pairs and watchlist to AsyncStorage
    AsyncStorage.multiSet([
      ['pinnedPairs', JSON.stringify(pinnedPairs)],
      ['watchlist', JSON.stringify(watchlist)],
    ])
      .catch((error) => console.error(error));
  }, [pinnedPairs, watchlist]);

  const handleAddToWatchlist = () => {
    const pair = `${fromCurrency}/${toCurrency}`;
    if (!watchlist.includes(pair)) {
      setWatchlist([...watchlist, pair]);
    }
  };

  const handleRemoveFromWatchlist = () => {
    const pair = `${fromCurrency}/${toCurrency}`;
    setWatchlist(watchlist.filter((p) => p !== pair));
  };

  // ...

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* ... */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>{`${fromCurrency}/${toCurrency}: ${exchangeRate}`}</Text>
        {watchlist.includes(`${fromCurrency}/${toCurrency}`) ? (
          <Button title="Remove from watchlist" onPress={handleRemoveFromWatchlist} />
        ) : (
          <Button title="Add to watchlist" onPress={handleAddToWatchlist} />
        )}
      </View>
    </View>
  );
};

export default Watchlist;
