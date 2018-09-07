/**
 * The theme context controls which style theme to apply to the site (light or dark).
 * @module [ {contexts} theme ]
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
    shadow: '#212121',
    subtleBackground: '#bdbdbd',
    navigation: {
      background: 'rgba(31, 21, 0, 0.7)'
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