import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import {
  primaryColorDarker,
  primaryColorLighter,
  primaryColorSuperLight,
} from "./colors";
import CustomSearchBar from "./CustomSearchBar";
import { useEffect } from "react";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  width: 80vw;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 600px) {
    
  }
`;
const Logo = styled.img`
  width: 80px;
`;
const LogoWithName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0px 0px 5px 1px #cccccc;
  h1 {
    font-size: 2rem;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    letter-spacing: 1rem;
    color: ${primaryColorDarker};
    font-weight: 900;
  }
  @media (max-width: 850px) {
    flex-direction: column;
    text-align: center;
    h1 {
      letter-spacing: 0px;
    }
  }
  @media (max-width: 400px) {
    flex-direction: column;
    text-align: center;
    h1 {
      letter-spacing: 0px;
      font-size: 1rem;
    }
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  background-color: ${primaryColorSuperLight};
  border-radius: 20px;
  margin-top: 1rem;
  padding: 40px 8px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 5px 1px #cccccc;
  div:first-child {
    width: 100%;
    max-width: 300px;
  }
`;
function Header({ topTenCryptos }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const options = topTenCryptos.map((data) => ({
    label: data.ticker.split("/")[0],
    value: data.ticker.split("/")[0],
  }));

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption) {
      const selectedValue = selectedOption.value;
      navigate(`/${selectedValue}`);
    }
  };

  const handleInputChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <StyledHeader>
      <Link to="/" style={{ textDecoration: "none" }}>
        <LogoWithName className="">
          <figure>
            <Logo src={logo} alt="" />
          </figure>
          <h1>
            CryptoCurrency <br /> Price Tracker
          </h1>
        </LogoWithName>
      </Link>
      <SearchWrapper>
        <Select
          searchable
          value={value}
          options={options}
          onChange={(newValue) => {
            handleInputChange(newValue);
            handleOptionSelect(newValue);
          }}
          placeholder=""
          styles={{
            control: (provided) => ({
              ...provided,
              maxWidth: "300px",
              width: "100%",
            }),
          }}
          components={{
            Input: (props) => <CustomInputComponent {...props} />,
          }}
        />
      </SearchWrapper>
    </StyledHeader>
  );
}

function CustomInputComponent({ value, onChange }) {
  return <CustomSearchBar value={value} onChange={onChange} />;
}

export default Header;
