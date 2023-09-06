import React, { useState } from "react";
import { styled } from "styled-components";
import { primaryColor, primaryColorLighter } from "./colors";

const SearchBar = styled.div`
  background: #ffffff;
  /* position: relative; */
  display: flex;
  justify-content: center;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
  input {
    background: #ffffff;
    width: 100%;
    height: 40px;
    border: none;
    padding-left: 8px;
    font-size: 2rem;
    border-radius: 8px;
  }
  input::placeholder {
    color: ${primaryColorLighter};
  }
  input:focus-visible {
    outline: none;
  }
  .MuiButtonBase-root {
    color: ${primaryColor};
  }
`;

const RemainingCharacters = styled.span`
  position: absolute;
  right: 0;
  top: -39px;
  z-index: 0;
`;
const InputError = styled.span`
  text-transform: capitalize;
  z-index: 0;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  color: red;
  font-weight: 900;
  border: 3px solid red;
  border-radius: 50px;
  padding: 0px 8px 0;
  white-space: nowrap;
  background-color: white;
  animation: showUp 150ms ease-in-out;
  @keyframes showUp {
    0% {
      transform: translateY(20px);
    }
    100% {
      transform: none;
    }
  }
`;

function CustomSearchBar({ value, onChange }) {
  const [characters, setCharacters] = useState(0);
  const maxCharacters = 30;

  function handleInputChange(event) {
    onChange(event);
    setCharacters(event.target.value.length);
  }

  return (
    <SearchBar>
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="Search"
        maxLength={maxCharacters}
        value={value}
      />
      {characters === 30 && <InputError>Max character!</InputError>}
    </SearchBar>
  );
}

export default CustomSearchBar;
