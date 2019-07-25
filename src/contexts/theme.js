/**
 * The theme context controls which style theme to apply to the site (light or dark).
 * @module [{contexts}theme]
 * @default theme.light
 * @example import { ThemeContext, themes } from "context/theme";
 */
import React from "react";

const shared = {
  brand: '#ffee58'
};

/**
 * The `themes` object contains style variables for each given theme.
 */
export const themes = {
  light: {
    ...shared,

    // Primary theme colours.
    background: '#eaeaea',
    color: '#333',
    link: '#4E53B1',
    linkHoverFocus: '#1E2485',
    linkActive: '#760E7D',
    shadow: '#757575',
    textShadow: '#fff',

    // Layout sections.
    navigation: {
      gradientStart: 'rgba(242, 242, 242, 0.8)',
      gradientEnd: 'rgba(234, 234, 234, 1)'
    },

    // Components.
    progress: {
      background: '#ccc',
      bar: '#757575'
    }
  },
  dark: {
    ...shared,

    // Primary theme colours.
    background: '#333',
    color: '#fff',
    link: '#9EA1E1',
    linkHoverFocus: '#fff',
    linkActive: '#BB5EC2',
    shadow: '#111',
    textShadow: '#111',

    // Specific sections.
    navigation: {
      gradientStart: 'rgba(33, 33, 33, 0.9)',
      gradientEnd: 'rgba(51, 51, 51, 1)'
    },

    progress: {
      background: '#616161',
      bar: '#ccc'
    }
  }
};

/**
 * `ThemeContext` is the context API for themes.
 */
export const ThemeContext = React.createContext(
  themes.light
);