# Backend API Documentation
1. Running the Server
    npm run dev
The server will listen on the specified port in .env file or 5001.
_____________________________________________________
2. API Endpoints
GET /api 
Description: Fetches data for the top 10 cryptocurrencies, including their symbols, prices, 24-hour percentage change, and full names.
Response: Returns an array of cryptocurrency objects with the following properties:
fullName: Full name of the cryptocurrency.
symbol: Ticker symbol of the cryptocurrency.
logo: URL of the cryptocurrency's logo.
price: Current price of the cryptocurrency.
change24h: Percentage change in the last 24 hours.

GET /api/:symbol 
Description: Fetches detailed information about a specific cryptocurrency by its symbol.
Parameters:
symbol (URL parameter): The symbol of the cryptocurrency (e.g., "BTC" for Bitcoin).
Response: Returns detailed information about the cryptocurrency, including its ticker symbol, last price, and more.
3. Code Structure
The code is organized as follows:

index.js: The main server file, which sets up the Express application, defines API endpoints, and starts the server.
fetchTop10Cryptos(): A function that fetches data for the top 10 cryptocurrencies, including their prices and percentage changes.
getCryptoInfoByTicker(ticker): A function that fetches additional information about a cryptocurrency using its ticker symbol.
getCryptoLogo(name): A function that retrieves the logo URL for a cryptocurrency.
Dependencies for Express, Axios, and ccxt are used to create the API and fetch data.
5. Dependencies
dotenv: For loading environment variables.
express: For creating the API server.
axios: For making HTTP requests.
ccxt: A cryptocurrency exchange library for fetching market data.
For more details and usage examples, refer to the code comments and the documentation of the individual functions.
# Frontend Documentation
CryptoCurrency Price Tracker App Documentation

File Structure
The application consists of several components and pages organized into separate files:

App.jsx: The main component that sets up the routing and fetches data from the API.
Header.jsx: The header component containing the logo and search functionality.
CustomSearchBar.jsx: A custom search bar component for input.
LandingPage.jsx: The landing page displaying the top ten cryptocurrencies.
CryptoPage.jsx: The cryptocurrency detail page displaying specific cryptocurrency information.
App.jsx
The App.jsx file serves as the entry point for the application. It is responsible for setting up routing and fetching data from the API.

Components:
Router: Initializes the React Router for navigation.
Header: Renders the header of the application.
Routes: Defines the routes for different pages.
Route: Maps specific routes to corresponding components.
LandingPage and CryptoPage: Components for displaying landing and cryptocurrency detail pages.
State:
topTenCryptos: Holds the data of the top ten cryptocurrencies.
loading: Indicates whether data is being loaded.
Effect:
Uses the useEffect hook to fetch data from the API when the component mounts.
Header.jsx
The Header.jsx file contains the header component of the application, which includes the logo and search functionality.

Components:
LogoWithName: Renders the application logo and name.
CustomSearchBar: Renders the custom search bar for cryptocurrency selection.
State:
value: Manages the search input value.
Functions:
handleOptionSelect: Handles the selection of a cryptocurrency option.
handleInputChange: Handles changes in the search input value.
Dependencies:
Utilizes the react-select library for the custom dropdown.
CustomSearchBar.jsx
The CustomSearchBar.jsx file defines a custom search bar component used in the header.

Components:
SearchBar: Styles the search bar component.
RemainingCharacters: Displays the remaining character count (max 30 characters).
InputError: Displays an error if the character limit is exceeded.
State:
characters: Keeps track of the character count.
Functions:
handleInputChange: Handles changes in the search input value.
LandingPage.jsx
The LandingPage.jsx file contains the landing page component, which displays the top ten cryptocurrencies.

Components:
Crypto: Renders individual cryptocurrency information.
Props:
topTenCryptos: An array of the top ten cryptocurrencies.
loading: Indicates whether data is being loaded.
CryptoPage.jsx
The CryptoPage.jsx file contains the cryptocurrency detail page component, which displays specific information about a selected cryptocurrency.

Props:
id: Dynamically extracted from the URL to determine the cryptocurrency to display.
State:
cryptoData: Holds the data of the selected cryptocurrency.
Effect:
Uses the useEffect hook to fetch data from the API based on the selected cryptocurrency.
Rendering:
Displays various cryptocurrency details, including symbol, timestamp, high, low, bid, ask, and more.
Conclusion
The CryptoCurrency Price Tracker is a React-based web application that allows users to explore and track the top ten cryptocurrencies. It provides a user-friendly interface with search functionality, making it easy for users to access detailed information about their favorite cryptocurrencies. The application is modularized, making it easy to maintain and extend with additional features in the future.