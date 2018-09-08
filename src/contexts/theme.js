/**
 * The theme context controls which style theme to apply to the site (light or dark).
 * @module [{contexts}theme]
 * @default theme.light
 * @example import { ThemeContext, themes } from "context/theme";
 */
import React from "react";

/**
 * The `themes` object contains style variables for each given theme.
 */
export const themes = {
  light: {
    brand: '#ffee58',
    background: '#f5f5f5',
    color: '#212121',
    faded: '#bdbdbd',
    link: '#337ab7',
    shadow: '#bdbdbd',
    subtleBackground: '#bdbdbd',
    container: {
      shadow: '#212121',
      footer: {
        border: '#e0e0e0',
        color: '#424242'
      }
    },
    navigation: {
      background: 'rgba(31, 21, 0, 0.7)'
    },
    panel: {
      background: '#fff',
      border: '#e0e0e0'
    },
    progressBar: {
      background: '#e0e0e0',
      foreground: '#212121',
      shadow: '#eee'
    }
  }
};

/**
 * `ThemeContext` is the context API for themes.
 */
export const ThemeContext = React.createContext(
  themes.light
);