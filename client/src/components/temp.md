import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import {
  primaryColorDarker,
  primaryColorLighter,
  primaryColorSuperLight,
} from "./colors";
import CustomSearchBar from "./CustomSearchBar";

const StyledHeader = styled.header`
  width: 80vw;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 100%;
  max-width: 80px;
`;
const LogoWithName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: ${primaryColorLighter}; */
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
`;
const SearchWrapper = styled.div`
  background-color: ${primaryColorSuperLight};
  border-radius: 20px;
  margin-top: 1rem;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 5px 1px #cccccc;
`;

function Header() {
  const [searchText, setSearchText] = useState("");

  console.log(searchText)
  return (
    <StyledHeader>
      <div>
        <LogoWithName className="">
          <figure>
            <Logo src={logo} alt="" />
          </figure>
          <h1>
            CryptoCurrency <br /> Price Tracker
          </h1>
        </LogoWithName>
      </div>
      <SearchWrapper>
        <CustomSearchBar
          value={searchText}
          onChange={(ev) => setSearchText(ev.target.value)}
        />
      </SearchWrapper>
    </StyledHeader>
  );
}

export default Header;
