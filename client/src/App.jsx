import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import CryptoPage from "./pages/CryptoPage";

function App() {
  const [topTenCryptos, setTopTenCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setTopTenCryptos(data);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header topTenCryptos={topTenCryptos} loading={loading} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LandingPage topTenCryptos={topTenCryptos} loading={loading} />
            }
          />
          <Route path="/:id" element={<CryptoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
