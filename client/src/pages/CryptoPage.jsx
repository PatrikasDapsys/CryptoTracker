import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { primaryColorSuperLight } from "../components/colors";

const Wrapper = styled.div`
  margin: 0 auto;
  background-color: ${primaryColorSuperLight};
  text-align: center;
`;

function CryptoPage() {
  const [cryptoData, setCryptoData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCryptoData(data);
      });
  }, [id]);

  if (!cryptoData) {
    return <Wrapper>Loading...</Wrapper>;
  }
  console.log(cryptoData.symbol);

  return (
    <Wrapper>
      <h2>Crypto Data</h2>
      <p>Symbol: {cryptoData.symbol}</p>
      <p>Timestamp: {cryptoData.timestamp}</p>
      <p>Datetime: {cryptoData.datetime}</p>
      <p>High: {cryptoData.high}</p>
      <p>Low: {cryptoData.low}</p>
      <p>Bid: {cryptoData.bid}</p>
      <p>Bid Volume: {cryptoData.bidVolume}</p>
      <p>Ask: {cryptoData.ask}</p>
      <p>Ask Volume: {cryptoData.askVolume}</p>
      <p>VWAP: {cryptoData.vwap}</p>
      <p>Open: {cryptoData.open}</p>
      <p>Close: {cryptoData.close}</p>
      <p>Last: {cryptoData.last}</p>
      <p>Previous Close: {cryptoData.previousClose}</p>
      <p>Change: {cryptoData.change}</p>
      <p>Percentage: {cryptoData.percentage}</p>
      <p>Average: {cryptoData.average}</p>
      <p>Base Volume: {cryptoData.baseVolume}</p>
      <p>Quote Volume: {cryptoData.quoteVolume}</p>
      <p>Info:</p>
      <pre>{JSON.stringify(cryptoData.info, null, 2)}</pre>
    </Wrapper>
  );
}

export default CryptoPage;
