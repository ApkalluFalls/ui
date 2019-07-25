import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CharacterContext } from "contexts/character";
import { LocalisationContext, localisation } from "contexts/localisation";
import { ThemeContext, themes } from "contexts/theme";

import API from 'js/api';

import Container from "components/Container";
import Navigation from "components/Navigation";

// Theme.
import { createUseStyles, createTheming } from 'react-jss';
import style from 'styles/global';

const theme = themes[localStorage && JSON.parse(localStorage.getItem('theme')) || 'dark'];
const useStyles = createUseStyles(style(theme));
const { ThemeProvider } = createTheming(ThemeContext);

function ApkalluFalls({}) {
  // No classes here, but we do want the global styles applied.
  useStyles();

  // Contexts.
  useContext(CharacterContext);
  useContext(LocalisationContext);
  useContext(ThemeContext);

  // State.
  const [version, setVersion] = useState(-1);

  useEffect(() => {
    (async () => {
      const api = new API();
      const cachedVersion = await api.fromCache('version');
      const apiVersion = await api.json('version', true);

      // If cached data exists for an older version, remove it.
      if (cachedVersion !== undefined && cachedVersion !== apiVersion) {
        localStorage.setItem('api', `{"misc":{"version":${apiVersion}}}`);
      }
      
      setVersion(apiVersion);
    })();
  }, [])

  if (version === -1) {
    return (
      <div>Loading</div>
    );
  }

  // Language is stored in local storage.
  const language = localStorage && JSON.parse(localStorage.getItem('lang')) || 'en';

  return (
    <React.StrictMode>
      <CharacterContext.Provider value={{
        avatar: 'https:\/\/img2.finalfantasyxiv.com\/f\/9d55d25fd7e4589bd66f8486aabc61e0_c274370774c6bc3483cc8740805f41bcfc0_96x96.jpg',
        id: 10012596,
        forename: 'Tequila',
        name: 'Tequila Mockingbird',
        surname: 'Mockingbird'
      }}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <LocalisationContext.Provider value={{
              language,
              locale: localisation[language]
            }}>
              <Navigation />
              <Container />
            </LocalisationContext.Provider>
          </ThemeProvider>
        </BrowserRouter>
      </CharacterContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(
  (
    <React.StrictMode>
      <BrowserRouter>
        <ApkalluFalls />
      </BrowserRouter>
    </React.StrictMode>
  ),
  document.getElementById('ApkalluFalls')
);