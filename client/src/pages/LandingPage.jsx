import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { primaryColor, primaryColorSuperLight } from "../components/colors";
import Crypto from "../components/Crypto";
import { Link } from "react-router-dom";

const Title = styled.h1`
  text-align: center;
  color: ${primaryColor};
  text-transform: capitalize;
`;

const Wrapper = styled.div`
  width: 80%;
  padding: 1rem;
  margin: 0 auto 80px;
  background-color: ${primaryColorSuperLight};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 1px #cccccc;
`;
const Info = styled.div`
  display: flex;
  color: #8d8d8d;
  div {
    width: 25%;
    text-align: center;
  }
  @media (max-width: 800px) {
    div {
      width: 33%;
    }
    div:nth-child(3) {
      display: none;
    }
  }
  @media (max-width: 500px) {
    div {
      width: 50%;
    }
    div:nth-child(4) {
      display: none;
    }
  }
`;

function LandingPage({ topTenCryptos, loading }) {
  return (
    <>
      <Title>Top ten Cryptocurrencies</Title>
      <Wrapper>
        <Info>
          <div>Name :</div>
          <div>Price : </div>
          <div>Change (24H) :</div>
          <div>More Option :</div>
        </Info>
        {loading
          ? new Array(10)
              .fill("0")
              .map((data, index) => (
                <Crypto
                  loading={loading}
                  key={index}
                  fullName={data.fullName}
                  ticker={data.ticker}
                  price={data.price}
                  change={data.change24h}
                  logo={data.logo}
                />
              ))
          : topTenCryptos.map((data, index) => (
              <Link
                to={`/${data.ticker.split("/")[0]}`}
                style={{ textDecoration: "none", color: "unset" }}
                key={index}
              >
                <Crypto
                  loading={loading}
                  fullName={data.fullName}
                  ticker={data.ticker}
                  price={data.price}
                  change={data.change24h}
                  logo={data.logo}
                />
              </Link>
            ))}
      </Wrapper>
    </>
  );
}

export default LandingPage;
