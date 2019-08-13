import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { CharacterContext } from "contexts/character";
import { LocalisationContext, localisation } from "contexts/localisation";
import { ThemeContext, themes } from "contexts/theme";

import API from 'js/api';

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

import Container from "components/Container";
import Navigation from "components/Navigation";

// Theme.
import { createTheming } from 'react-jss';

const { ThemeProvider } = createTheming(ThemeContext);

function initFirebase() {
  return new Promise(resolve => {
    firebase.initializeApp({
      apiKey: "AIzaSyA5P0r1Iur1bGtXm7nLwwz1JNDa2YhHZ18",
      authDomain: "aetheryte.apkallufalls.com",
      databaseURL: "https://apkallu-falls.firebaseio.com",
      projectId: "apkallu-falls",
      storageBucket: "apkallu-falls.appspot.com",
      messagingSenderId: "1094535782464"
    });

    firebase.firestore();

    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        delete window.signedInUser;
        return resolve();
      }

      let type;

      const {
        photoUrl: avatar,
        displayName,
        email,
        uid
      } = user;

      switch (user.providerData[0].providerId) {
        case 'facebook.com':
          type = 'Facebook';
          break;

        case 'google.com':
          type = 'Google';
          break;

        case 'password':
          type = 'Email';
          break;

        case 'twitter.com':
          type = 'Twitter';
          break;
        
        default:
          throw new Error('Unhandled login provider', user.providerData[0]);
      }
      
      window.signedInUser = {
        data: {
          avatar,
          displayName: displayName || email,
          uid
        },
        type
      };

      resolve();
    });
  });
}

function ApkalluFalls({}) {
  // Contexts.
  useContext(CharacterContext);
  useContext(LocalisationContext);
  useContext(ThemeContext);

  // State.
  const [version, setVersion] = useState(-1);
  const [character, setCharacter] = useState();

  const theme = themes[localStorage && localStorage.getItem('theme') || 'light'];

  useEffect(() => {
    (async () => {
      const api = new API();
      const cachedVersion = await api.fromCache('version');
      const apiVersion = await api.json('version', true);

      // If cached data exists for an older version, remove it.
      if (cachedVersion !== undefined && cachedVersion !== apiVersion) {
        localStorage.setItem('api', `{"misc":{"version":${apiVersion}}}`);
      }
      
      await initFirebase();
      setCharacter(window.signedInUser && window.signedInUser.data);

      // {
      //   avatar: 'https:\/\/img2.finalfantasyxiv.com\/f\/9d55d25fd7e4589bd66f8486aabc61e0_c274370774c6bc3483cc8740805f41bcfc0_96x96.jpg',
      //   id: 10012596,
      //   forename: 'Tequila',
      //   name: 'Tequila Mockingbird',
      //   surname: 'Mockingbird'
      // }

      setVersion(apiVersion);
    })();
  }, [])

  if (version === -1) {
    return (
      <div>Loading</div>
    );
  }

  console.info(theme);

  // Language is stored in local storage.
  const language = localStorage && JSON.parse(localStorage.getItem('lang')) || 'en';

  return (
    <React.StrictMode>
      <CharacterContext.Provider value={{
        ...character
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