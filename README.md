Currency Converter
This is a React Native mobile application that allows users to convert currencies and view exchange rate charts, pin their most searched currency pairs, view their search history, and add currency pairs to their watchlist.

Features
Exchange rate conversion: Users can convert currencies by selecting two currencies from a list of available currencies and entering the amount to be converted. The app uses the Exchange Rates API to get the latest exchange rates.
Exchange rate chart: Users can view a chart that shows the exchange rate history between two currencies for the past week, month, or year. The chart is powered by the Victory Native charting library.
Pin most searched currency pairs: Users can pin their most searched currency pairs to quickly access them from the home screen. Pinned pairs are displayed in a separate section at the top of the currency pair list.
Offline mode: Users can use the app in offline mode with the last live data when they were online. This feature uses the AsyncStorage API to cache the latest exchange rates on the device.
Search history: Users can view their search history, which shows their recent searched currency pairs. The search history is also stored using the AsyncStorage API.
Watchlist: Users can add currency pairs to their watchlist, which displays their selected pairs in a separate section on the home screen.
Getting started
To get started with the app, follow these steps:

1. Clone the repository and navigate to the project directory:

git clone https://github.com/your-username/currency_converter.git
cd currency_converter

2. Install the dependencies:
npm install

3. Start the development server:
npm start

4. Run the app on an Android or iOS emulator or on a physical device:
npm run android
or
npm run ios

Usage
When the app starts, you will see a list of available currencies. To convert a currency, select two currencies from the list and enter the amount to be converted. The converted amount will be displayed below.

To view the exchange rate chart between two currencies, select the currencies from the list and choose a time period (week, month, or year). The chart will be displayed below.

To pin a currency pair, swipe left on the currency pair in the list and tap the pin icon.

To view your search history, tap the "History" button in the bottom navigation bar. Your recent searched currency pairs will be displayed in a list.

To add a currency pair to your watchlist, swipe left on the currency pair in the list and tap the watchlist icon. Your selected currency pairs will be displayed in a separate section at the top of the currency pair list.

