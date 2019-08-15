import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { CharacterContext } from "contexts/character";
import { LocalisationContext, localisation } from "contexts/localisation";
import { ThemeContext, themes } from "contexts/theme";
import { UserContext } from "contexts/user";

import API from 'js/api';

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

import PageLoader from 'components/content/PageLoader';
import Container from "components/Container";
import Navigation from "components/Navigation";

// Theme.
import { createTheming, createUseStyles } from 'react-jss';
import globalStyle from 'styles/global';

const { ThemeProvider } = createTheming(ThemeContext);

function initFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyA5P0r1Iur1bGtXm7nLwwz1JNDa2YhHZ18",
    authDomain: "aetheryte.apkallufalls.com",
    databaseURL: "https://apkallu-falls.firebaseio.com",
    projectId: "apkallu-falls",
    storageBucket: "apkallu-falls.appspot.com",
    messagingSenderId: "1094535782464"
  });

  firebase.firestore();
}

function parseFirebaseUserObject(user) {
  if (!user) {
    return {};
  }

  let type;

  const {
    photoURL: avatar,
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
      throw new Error(`Unhandled login provider ${user.providerData[0]}.`);
  }

  const character = {
    data: {
      avatar,
      displayName: displayName || email,
      uid
    },
    type
  };
  
  window.signedInUser = character;
  return character;
}

function ApkalluFalls({}) {
  // Contexts.
  useContext(CharacterContext);
  useContext(LocalisationContext);
  useContext(ThemeContext);
  useContext(UserContext);

  // State.
  const [version, setVersion] = useState(-1);
  const [character, setCharacter] = useState({ loading: true });
  const [user, setUser] = useState({ loading: true });

  const theme = themes[localStorage && localStorage.getItem('theme') || 'light'];

  // Apply global styles.
  createUseStyles(globalStyle(theme))();

  useEffect(() => {
    (async () => {
      const api = new API();
      const cachedVersion = await api.fromCache('version');
      const apiVersion = await api.json('version', true);

      // If cached data exists for an older version, remove it.
      if (cachedVersion !== undefined && cachedVersion !== apiVersion) {
        localStorage.setItem('api', `{"misc":{"version":${apiVersion}}}`);
      }

      initFirebase();
      const firebaseUnsubscribe = firebase.auth().onAuthStateChanged(onFirebaseAuthChange);

      setVersion(apiVersion);

      return () => firebaseUnsubscribe();
    })();
  }, [])

  function onFirebaseAuthChange(user) {
    setUser(parseFirebaseUserObject(user));
  }

  if (version === -1) {
    return (
      <PageLoader />
    );
  }

  // Language is stored in local storage.
  const language = localStorage && JSON.parse(localStorage.getItem('lang')) || 'en';

  return (
    <React.StrictMode>
      <UserContext.Provider value={{...user}}>
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
      </UserContext.Provider>
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