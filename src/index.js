import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CharacterContext } from "contexts/character";
import { LocalisationContext } from "contexts/localisation";
import { ThemeContext } from "contexts/theme";

import Container from "./js/layout/Container";
import Navigation from "./js/layout/Navigation";

ReactDOM.render(
  (
    <React.StrictMode>
      <CharacterContext.Provider>
        <BrowserRouter>
          <ThemeContext.Provider value={'light'}>
            <LocalisationContext.Provider
              value={localStorage && JSON.parse(localStorage.getItem('lang')) || 'en'}
            >
              <Navigation />
              <Container />
            </LocalisationContext.Provider>
          </ThemeContext.Provider>
        </BrowserRouter>
      </CharacterContext.Provider>
    </React.StrictMode>
  ),
  document.getElementById('ApkalluFalls')
);