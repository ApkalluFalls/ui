import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { APIContext } from "contexts/api";
import { CharacterContext } from "contexts/character";
import { LocalisationContext, localisation } from "contexts/localisation";
import { ThemeContext, themes } from "contexts/theme";
import { UserContext } from "contexts/user";

import API from 'js/api';

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

import FullPageError from 'components/content/FullPageError';
import PageLoader from 'components/content/PageLoader';
import Container from "components/Container";
import Navigation from "components/Navigation";

// Theme.
import { createTheming } from 'react-jss';
const { ThemeProvider } = createTheming(ThemeContext);

/**
 * These are the default settings for anyone who first visits the site. If the user is logged in
 * these will be replaced with the settings saved from their Account page.
 */
const defaultUserSettings = {
  enableManualTrackingBarding: true,
  enableManualTrackingEmotes: true,
  enableManualTrackingMinions: true,
  enableManualTrackingMounts: true,
  enableManualTrackingOrchestrion: true,
  hideVerifyCharacterSection: false,
  revealExternalPromos: false,
  revealInGameEvents: false,
  revealRealWorldEvents: false,
  revealStorePurchases: false,
  revealUnknownObtainMethods: true,
  revealUnusedLegacyContent: false,
  theme: themes[localStorage.getItem('theme') || 'light']
};

/**
 * Make the first handshake with Firebase so that we're ready to send and receive data when
 * necessary.
 */
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

/**
 * When Firebase's auth state changes, this function is called to populate the user context.
 * @param {Object} user - The user object received from Firebase.
 */
function parseFirebaseUserObject(user) {
  if (!user) {
    return {
      isLoggedIn: false
    };
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
    isLoggedIn: true,
    sessionStart: Number(new Date()),
    type
  };

  return character;
}

function ApkalluFalls({}) {
  // Contexts.
  useContext(APIContext);
  useContext(CharacterContext);
  useContext(LocalisationContext);
  useContext(UserContext);
  useContext(ThemeContext);

  // State.
  const [version, setVersion] = useState(-1);
  const [apiKeys, setAPIKeys] = useState();
  const [character, setCharacter] = useState({ loading: true });
  const [characterAchievements, setCharacterAchievements] = useState();
  const [user, setUser] = useState({ loading: true });
  const [userSettings, setUserSettings] = useState(defaultUserSettings);
  const [userVerifiedCharacters, setUserVerifiedCharacters] = useState();

  const cachedTheme = localStorage.getItem('theme') || 'light';

  if (cachedTheme === 'dark') {
    document.documentElement.className = 'dark';
  }

  const [theme, setTheme] = useState((
    themes[cachedTheme]
  ));

  useEffect(() => {
    (async () => {
      const api = new API();
      const cachedVersion = await api.fromCache('version');
      const apiVersion = await api.json('version', true);

      if (typeof apiVersion === 'object' && apiVersion.error) {
        setVersion(-999);
        return;
      }

      // If cached data exists for an older version, remove it.
      if (cachedVersion !== undefined && cachedVersion !== apiVersion) {
        localStorage.setItem('api', `{"misc":{"version":${apiVersion}}}`);
      }

      initFirebase();
      const firebaseUnsubscribe = firebase.auth().onAuthStateChanged(onFirebaseAuthChange);

      setVersion(apiVersion);

      const cachedCharacter = JSON.parse(localStorage.getItem('character'));
      setCharacter(cachedCharacter || {});
      
      if (cachedCharacter) {
        setCharacterAchievements(JSON.parse(localStorage.getItem('character-achievements')))
      }

      return () => firebaseUnsubscribe();
    })();
  }, []);

  useEffect(() => {
    const {
      key: settingsThemeKey
    } = userSettings.theme;

    if (theme.key !== settingsThemeKey) {
      localStorage.setItem('theme', settingsThemeKey);
      document.documentElement.className = settingsThemeKey;
      setTheme(userSettings.theme);
    }
  }, [userSettings])

  /**
   * Update the user context (via state) when Firebase detects an authentication change.
   * @param {Object} user - The user object from Firebase.
   */
  function onFirebaseAuthChange(user) {
    setUser(parseFirebaseUserObject(user));
  }

  /**
   * Update the theme context (via state).
   */
  function handleCharacterChange(character) {
    if (character.name) {
      localStorage.setItem('character', JSON.stringify(character));
      localStorage.removeItem('character-achievements');
    } else {
      localStorage.removeItem('character');
      localStorage.removeItem('character-achievements');
    }

    setCharacterAchievements(undefined);
    setCharacter(character);
  }

  function handleCharacterSync(character, achievements) {
    localStorage.setItem('character', JSON.stringify(character));
    localStorage.setItem('character-achievements', JSON.stringify(achievements));

    setCharacterAchievements(achievements);
    setCharacter(character);
  }

  /**
   * Update the user settings to include the new changes.
   * @param {Object} settings - An object containing modified settings.
   */
  function handleUserSettingsChange(settings) {
    setUserSettings({
      ...userSettings,
      ...settings
    })
  }

  if (version === -1) {
    return (
      <ThemeProvider theme={{
        ...theme
      }}>
        <PageLoader />
      </ThemeProvider>
    );
  }

  if (version === -999) {
    return (
      <ThemeProvider theme={{
        ...theme
      }}>
        <FullPageError />
      </ThemeProvider>
    )
  }

  // Language is stored in local storage.
  const language = localStorage && JSON.parse(localStorage.getItem('lang')) || 'en';

  return (
    <React.StrictMode>
      <UserContext.Provider value={{
        ...user,
        settings: userSettings,
        modifySettings: handleUserSettingsChange,
        verifiedCharacters: userVerifiedCharacters,
        setVerifiedCharacters: setUserVerifiedCharacters
      }}>
        <CharacterContext.Provider value={{
          ...character,
          achievements: characterAchievements,
          change: handleCharacterChange,
          setAchievements: setCharacterAchievements,
          onSync: handleCharacterSync
        }}>
          <BrowserRouter>
            <ThemeProvider theme={{
              ...theme
            }}>
              <LocalisationContext.Provider value={{
                language,
                locale: localisation[language]
              }}>
                <APIContext.Provider value={{
                  keys: apiKeys,
                  version,
                  setKeys: setAPIKeys
                }}>
                  <Navigation />
                  <Container />
                </APIContext.Provider>
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