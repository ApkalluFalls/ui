/**
 * The localisation context controls the text language throughout the site.
 * @module [ {contexts} localisation ]
 * @default localisation.en
 * @example import { LocalisationContext, localisation } from "context/theme";
 */
import React from "react";

/**
 * The `localisation` object contains localised strings.
 */
export const localisation = {
  en: {
    common: {
      achievements: 'Achievements'
    },
    components: {
      progress: {
        nOfN2: '{n0} of {n1}'
      }
    },
    pages: {
      home: {
        heading: 'Welcome to Apkallu Falls',
        about: 'Apkallu Falls is a character content tracking website which by default hides anything which is unobtainable, time-limited or promotional. It also provides details of how to obtain everything it tracks.',
        whatIsHidden: 'What is hidden?'
      }
    }
  }
};

/**
 * `localeInject` injects arguments into a given string.
 * @param {string} string - The base string to apply injection to.
 * @param  {...any} args - The content to inject into the base string.
 * @prop {string} \{0\} - Zero-indexed argument replacement position within string.
 * @prop {string} \{i0\} - Wraps match in `<strong>` tags.
 * @prop {string} \{n0\} - Converts match to number and executes `toLocaleString` on it.
 * @example localeInject('The {0} is {1}', 'minion ID', 40)
 */
export const localeInject = (string, ...args) => {
  if (!args.length)
    return console.warn(`localeInject called with no args on string "${string}"`);

  return string.replace(/{([a-z]+)?(\d+)}/g, (match, important, group) => {
    const arg = args[group];

    if (arg === '')
      return '';

    switch (important) {
      case 'i':
        return '<strong>' + arg + '</strong>';

      case 'n':
        return Number(arg).toLocaleString()
    }

    return arg || '';
  })
}

/**
 * `LocalisationContext` is the context API for localisation.
 */
export const LocalisationContext = React.createContext(
  localisation.en
);