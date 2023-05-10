//History based search which shows user’s recent searched currency pairs:
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { getExchangeRate } from './api';

const HistorySearch = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history !== null) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveSearchHistory = async (from, to) => {
    try {
      const history = [...searchHistory, { from, to }];
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
      setSearchHistory(history);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExchangeRate = async () => {
    const rate = await getExchangeRate(fromCurrency, toCurrency);
    setExchangeRate(rate);
    saveSearchHistory(fromCurrency, toCurrency);
  };

  const renderSearchHistory = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text>{`${item.from} to ${item.to}`}</Text>
      <Text>{`Rate: ${getExchangeRate(item.from, item.to)}`}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          style={{ flex: 1, marginRight: 10, borderWidth: 1, padding: 10 }}
          value={fromCurrency}
          onChangeText={setFromCurrency}
          placeholder="From currency"
        />
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10 }}
          value={toCurrency}
          onChangeText={setToCurrency}
          placeholder="To currency"
        />
      </View>
      <Button title="Get exchange rate" onPress={handleExchangeRate} />
      {exchangeRate && <Text>{`1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`}</Text>}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Search history:</Text>
      {searchHistory.length === 0 ? (
        <Text>No search history yet.</Text>
      ) : (
        <FlatList
          data={searchHistory}
          renderItem={renderSearchHistory}
          keyExtractor={(item, index) => `${item.from}-${item.to}-${index}`}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default HistorySearch;
