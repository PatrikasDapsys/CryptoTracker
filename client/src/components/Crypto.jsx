import React from "react";
import { styled } from "styled-components";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CryptoWrapper = styled.div`
  border-radius: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  transition: all 300ms ease;
  img {
    width: 40px;
    height: 40px;
  }
  div {
    width: 25%;
    text-align: center;
  }
  div .MuiSvgIcon-root:hover {
    transition: all 300ms ease-in-out;
    transform: scale(1.3);
  }
  &:hover {
    background-color: #ecd8f4;
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
    div .MuiSvgIcon-root {
      display: none;
    }
  }
`;
const CryptoInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const CryptoNames = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    text-align: left;
  }
  div:first-child {
    border-bottom: 1px solid #ccc;
  }
`;
const Seperator = styled.hr`
  width: 90%;
  border-color: #ffffff;
`;
const GrayCircle = styled.div`
  max-width: 40px;
  max-height: 40px;
  border-radius: 100%;
  background-color: #bdbdbd;
`;

function Crypto({ loading, fullName, price, ticker, change, logo }) {
  const changeColor = parseFloat(change) < 0.1 ? "red" : "green";
  return (
    <>
      <CryptoWrapper>
        <CryptoInfo>
          {logo ? <img src={logo} alt="" /> : <GrayCircle></GrayCircle>}
          <CryptoNames>
            {loading ? (
              <div>Loading</div>
            ) : fullName ? (
              <div>{fullName}</div>
            ) : (
              <div>Unavailable</div>
            )}
            {loading ? (
              <div>Loading</div>
            ) : ticker ? (
              <div>{ticker}</div>
            ) : (
              <div>Unavailable</div>
            )}
          </CryptoNames>
        </CryptoInfo>
        {loading ? (
          <div>Loading</div>
        ) : price ? (
          <div>{price.toFixed(2)}$</div>
        ) : (
          <div>Unavailable</div>
        )}
        <div style={{ color: changeColor }}>
          {loading ? (
            <div style={{ width: "100%" }}>Loading</div>
          ) : change !== undefined ? (
            `${change}`
          ) : (
            "N/A"
          )}
        </div>
        <div>
          <KeyboardArrowRightIcon fontSize="large" />
        </div>
      </CryptoWrapper>
      <Seperator />
    </>
  );
}

export default Crypto;
