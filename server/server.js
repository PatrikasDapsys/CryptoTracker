require("dotenv").config();
const express = require("express");
const axios = require("axios");
var ccxt = require("ccxt");
const app = express();
const port = process.env.PORT || 5001;
const apiKey = process.env.COIN_MARKET_CAP_API_KEY;

// Create an array to store the data for the top 10 cryptocurrencies
async function fetchTop10Cryptos() {
  try {
    const top10Cryptos = [];
    const binance = new ccxt.binance(); // Create a Binance exchange instance

    // Fetch information about all trading pairs
    const allMarkets = await binance.fetchMarkets();

    // Filter trading pairs with USD as the quote asset
    const usdMarkets = allMarkets.filter((market) => market.quote === "USDT");

    // Sort trading pairs by trading volume in descending order
    usdMarkets.sort((a, b) => b.quoteVolume - a.quoteVolume);

    // Get the top 10 trading pairs by trading volume
    const top10Markets = usdMarkets.slice(0, 10);

    // Fetch ticker data for the top 10 trading pairs
    const tickerData = await binance.fetchTickers(
      top10Markets.map((market) => market.symbol)
    );

    // Extract and store the required information for each trading pair
    for (const market of top10Markets) {
      const symbol = market.symbol;
      const ticker = tickerData[symbol];
      const change24h = ticker.percentage.toFixed(2); // Change displayed as a percentage
      const price = ticker.last;
      const baseAsset = market.base;

      // Create the ticker symbol in the format 'ticker/USD'
      const tickerSymbol = `${baseAsset}/USD`;

      // Store the data as an object in the array
      top10Cryptos.push({
        fullName: null,
        symbol: tickerSymbol,
        logo: null, // You can add logos if available
        price,
        change24h: `${change24h}%`, // Display change as a percentage
        ticker: tickerSymbol,
      });
    }

    // Create an array of promises for fetching additional information
    const cryptoInfoPromises = top10Cryptos.map((data) => {
      const ticker = data.ticker.split("/")[0];
      return getCryptoInfoByTicker(ticker);
    });

    // Wait for all promises to resolve and update fullName
    const cryptoInfoResults = await Promise.all(cryptoInfoPromises);

    // Update the fullName property for each cryptocurrency
    cryptoInfoResults.forEach((cryptoInfo, index) => {
      if (cryptoInfo) {
        top10Cryptos[index].fullName = cryptoInfo.fullName;
      }
    });

    for (const data of top10Cryptos) {
      const logo = await getCryptoLogo(data.fullName);
      data.logo = logo; // Update the logo property
    }
    return top10Cryptos;
  } catch (error) {
    console.error("Error:", error);
  }
}
//////////////////////////
async function getCryptoInfoByTicker(ticker) {
  try {
    // Make a GET request to the CoinMarketCap API
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map`,
      {
        params: {
          symbol: ticker.toUpperCase(), // Convert the ticker to uppercase
        },
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
        },
      }
    );

    if (response.data.status.error_code !== 0) {
      throw new Error(
        `Error fetching data for ${ticker}: ${response.data.status.error_message}`
      );
    }

    // Extract the data for the first cryptocurrency (assuming the ticker is unique)
    const cryptoData = response.data.data[0];

    // Extract the full name
    const fullName = cryptoData.name;

    return {
      fullName,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

async function getCryptoLogo(name) {
  try {
    name = name.toLowerCase();
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${name}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data.image && data.image.small) {
        return data.image.small; // Assuming you want the small-sized logo
      }
    }
    return null; // Return null if logo is not found
  } catch (error) {
    console.log("error: " + error);
    return null;
  }
}

app.get("/api", async (req, res) => {
  try {
    const data = await fetchTop10Cryptos();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    console.log("User searched for: " + symbol);
    const exchange = new ccxt.binance();
    const ticker = await exchange.fetchTicker(symbol + "/USDT");
    res.json(ticker);
  } catch (error) {
    console.error("Error fetching data from Binance API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
