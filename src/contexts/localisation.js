import React from "react";

export const localisation = {
  en: {
    pages: {
      home: {
        heading: 'Welcome to Apkallu Falls',
        about: 'Apkallu Falls is a character content tracking website which by default hides anything which is unobtainable, time-limited or promotional. It also provides details of how to obtain everything it tracks.',
        whatIsHidden: 'What is hidden?'
      }
    }
  }
};

export const LocalisationContext = React.createContext(
  localisation.en
);