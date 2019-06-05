import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CharacterContext } from "contexts/character";
import { LocalisationContext } from "contexts/localisation";
import { ThemeContext } from "contexts/theme";

import API from 'js/api';

import Container from "components/Container";
import Navigation from "components/Navigation";

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/global';

const ApkalluFalls = injectSheet(style)(() => {
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
      <CharacterContext.Provider>
        <BrowserRouter>
          <ThemeContext.Provider value={'light'}>
            <LocalisationContext.Provider value={language}>
              <Navigation />
              <Container />
            </LocalisationContext.Provider>
          </ThemeContext.Provider>
        </BrowserRouter>
      </CharacterContext.Provider>
    </React.StrictMode>
  );
});

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