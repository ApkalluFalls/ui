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
let defaultUserSettings = {
  enableManualTrackingBarding: true,
  enableManualTrackingEmotes: true,
  enableManualTrackingMinions: true,
  enableManualTrackingMounts: true,
  enableManualTrackingOrchestrion: true,
  expansionARealmReborn: true,
  expansionHeavensward: true,
  expansionStormblood: true,
  expansionShadowbringers: true,
  hideVerifyCharacterSection: false,
  revealExternalPromos: false,
  revealInGameEvents: false,
  revealRealWorldEvents: false,
  revealStorePurchases: false,
  revealUnknownObtainMethods: true,
  revealUnusedLegacyContent: false,
  theme: 'light'
};

const userSettingsOffset = {
  ...defaultUserSettings,
  ...(JSON.parse(localStorage.getItem('settings')) || {})
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
  const [apiOverview, setAPIOverview] = useState();
  const [apiPatchData, setAPIPatchData] = useState();
  const [character, setCharacter] = useState({ loading: true });
  const [characterData, setCharacterData] = useState();
  const [user, setUser] = useState({ loading: true });
  const [userSettings, setUserSettings] = useState(userSettingsOffset);
  const [userUnsavedChanges, setUserUnsavedChanges] = useState((
    JSON.parse(localStorage.getItem('unsavedChanges'))
  ));
  const [userVerifiedCharacters, setUserVerifiedCharacters] = useState();


  // Language and theme are stored in local storage.
  const language = localStorage && JSON.parse(localStorage.getItem('lang')) || 'en';
  const cachedTheme = userSettings.theme;

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
        setCharacterData(JSON.parse(localStorage.getItem('character-data')))
      }

      const patches = await new API(language).json('patches');
      setAPIPatchData(patches);

      return () => firebaseUnsubscribe();
    })();
  }, []);

  // Check if the user's settings contain unsaved changes.
  useEffect(() => {
    if (version < 0 || !userSettings) {
      return;
    }

    const unsaved = {};

    Object.entries(defaultUserSettings).forEach(([settingKey, settingValue]) => {
      const newSetting = userSettings[settingKey];
      if (newSetting !== undefined && newSetting !== settingValue) {
        unsaved[settingKey] = newSetting;
      }
    });

    const { uid } = user.data;
    const unsavedChanges = { ...userUnsavedChanges };

    if (!Object.keys(unsaved).length) {
      if (unsavedChanges[uid] && unsavedChanges[uid].settings) {
        delete unsavedChanges[uid].settings;
      }

      if (unsavedChanges[uid] && !Object.keys(unsavedChanges[uid]).length) {
        delete unsavedChanges[uid];
      }
    } else {
      if (!unsavedChanges[uid]) {
        unsavedChanges[uid] = {};
      }

      unsavedChanges[uid].settings = unsaved;
    }

    handleUserUnsavedChangesSet(unsavedChanges);
  }, [userSettings])

  useEffect(() => {
    if (!user || !user.isLoggedIn || !user.data || !user.data.uid) {
      return;
    }
    
    (async () => {
      const { uid } = user.data;

      const {
        settings
      } = await new API(undefined, uid).db();

      const unsavedChanges = JSON.parse(localStorage.getItem('unsavedChanges') || {});

      if (unsavedChanges[uid] && unsavedChanges[uid].settings) {
        localStorage.setItem('settings', JSON.stringify(unsavedChanges[uid].settings));
      } else {
        localStorage.removeItem('settings');
      }
  
      // If the user has saved settings, apply those and update the user context.
      if (settings) {
        defaultUserSettings = {
          ...defaultUserSettings,
          ...settings,
          ...(JSON.parse(localStorage.getItem('settings')) || {})
        };
        handleUserSettingsChange(settings);
      }
    })();
  }, [user]);

  /**
   * Update the user context (via state) when Firebase detects an authentication change.
   * @param {Object} user - The user object from Firebase.
   */
  async function onFirebaseAuthChange(user) {
    setUser(parseFirebaseUserObject(user));
  }

  /**
   * Update the theme context (via state).
   */
  function handleCharacterChange(character) {
    if (character.name) {
      localStorage.setItem('character', JSON.stringify(character));
    } else {
      localStorage.removeItem('character');
    }

    localStorage.removeItem('character-achievements');
    setCharacterData(undefined);
    setCharacter(character);
  }

  /**
   * Update the Character context.
   * @param {Object} character - The character object.
   * @param {Array} achievements - The character's unlocked achievements.
   * @param {Array} titles - The character's unlocked titles.
   */
  async function handleCharacterSync(character, achievements, titles = []) {
    localStorage.setItem('character', JSON.stringify(character));
    
    if (Array.isArray(achievements)) {
      if (!user || !user.isLoggedIn) {
        return;
      }

      const { id: characterId } = character;

      if (!characterId) {
        return;
      }

      const {
        barding = [],
        emotes = [],
        minions = [],
        mounts = [],
        'orchestrion-rolls': orchestrion = []
      } = await new API(undefined, user.data.uid).db();

      /**
       * Filter the relevant information from the user's saved data.
       * @param {Array} content - A content array.
       */
      function getObtainedContentForCharacter(content) {
        return content.filter((
          entry => entry.character === Number(characterId) && entry.obtained
        )).map(entry => entry.id);
      }

      const characterData = {
        achievements,
        barding: getObtainedContentForCharacter(barding),
        emotes: getObtainedContentForCharacter(emotes),
        minions: getObtainedContentForCharacter(minions),
        mounts: getObtainedContentForCharacter(mounts),
        orchestrion: getObtainedContentForCharacter(orchestrion),
        titles
      };
      
      localStorage.setItem('character-data', JSON.stringify(characterData));
      setCharacterData(characterData);
    } else {
      setCharacterData(undefined);
    }

    setCharacter(character);
  }

  /**
   * Update the user settings to include the new changes.
   * @param {Object} settings - An object containing modified settings.
   */
  function handleUserSettingsChange(settings) {
    // If the theme has changed, update the theme context.
    if (settings.theme && theme.key !== settings.theme) {
      (themeKey => {
        // Without this timeout the HTML element will not get correctly updated.
        setTimeout(() => {
          document.documentElement.className = themeKey;
        }, 1);
      })(settings.theme);
      setTheme(themes[settings.theme]);
    }

    const newSettings = {
      ...userSettings,
      ...settings
    };

    localStorage.setItem('settings', JSON.stringify(newSettings));
    setUserSettings(newSettings);
  }

  /**
   * Modify the user's unsaved changes array.
   * @param {String} source - The content source (e.g. `"barding"`).
   * @param {Object} entry - The content entry which has been changed.
   * @param {Boolean} isObtained - Whether the content is marked as obtained or not.
   */
  function handleUserUnsavedChangesChange(source, entry, isObtained) {
    const unsavedChanges = userUnsavedChanges ? { ...userUnsavedChanges } : {};
    const { uid } = user.data;
    const { id: characterId } = character;

    if (!unsavedChanges[uid]) {
      unsavedChanges[uid] = {};
    }

    if (!unsavedChanges[uid][characterId]) {
      unsavedChanges[uid][characterId] = {};
    }

    const unsavedChangesForUserCharacter = unsavedChanges[uid][characterId];

    if (!unsavedChangesForUserCharacter[source]) {
      unsavedChangesForUserCharacter[source] = {};
    }

    if (unsavedChangesForUserCharacter[source][entry.id]) {
      delete unsavedChangesForUserCharacter[source][entry.id];

      // Tidy up.
      if (!Object.keys(unsavedChangesForUserCharacter[source]).length) {
        delete unsavedChangesForUserCharacter[source];

        if (!Object.keys(unsavedChangesForUserCharacter).length) {
          delete unsavedChanges[uid][characterId];

          if (!Object.keys(unsavedChanges[uid]).length) {
            delete unsavedChanges[uid];
          }
        }
      }
    } else {
      unsavedChangesForUserCharacter[source][entry.id] = isObtained;
    }

    setUserUnsavedChanges(unsavedChanges);
    localStorage.setItem('unsavedChanges', JSON.stringify(unsavedChanges));
  }

  /**
   * Directly set the unsaved changes for the user.
   * @param {Object} data - Unsaved changes data.
   */
  function handleUserUnsavedChangesSet(data) {
    setUserUnsavedChanges(data);
    localStorage.setItem('unsavedChanges', JSON.stringify(data));
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

  return (
    <React.StrictMode>
      <UserContext.Provider value={{
        ...user,
        settings: userSettings,
        modifySettings: handleUserSettingsChange,
        unsavedChanges: userUnsavedChanges,
        verifiedCharacters: userVerifiedCharacters,
        modifyUnsavedChanges: handleUserUnsavedChangesChange,
        setUnsavedChanges: handleUserUnsavedChangesSet,
        setVerifiedCharacters: setUserVerifiedCharacters
      }}>
        <CharacterContext.Provider value={{
          ...character,
          change: handleCharacterChange,
          data: characterData,
          setData: setCharacterData,
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
                  overview: apiOverview,
                  patches: apiPatchData,
                  version,
                  setOverview: setAPIOverview
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