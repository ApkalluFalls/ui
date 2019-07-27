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
    border: '#ccc',
    color: '#333',
    colorSubtle: '#424242',
    link: '#4E53B1',
    linkHoverFocus: '#1E2485',
    linkActive: '#760E7D',
    shadow: '#757575',
    textShadow: '#fff',

    // Layout sections.
    navigation: {
      discord: 'rgba(113, 136, 218)',
      discordHover: 'rgba(113, 136, 218, 0.9)',
      gradientStart: 'rgba(242, 242, 242, 0.8)',
      gradientEnd: 'rgba(234, 234, 234, 1)',
      patreon: 'rgba(249, 104, 84)',
      patreonHover: 'rgba(249, 104, 84, 0.9)'
    },

    // Components.
    panel: {
      background: '#fafafa',
      headingBorder: '#bdbdbd'
    },
    progress: {
      background: '#ccc',
      bar: '#757575'
    },

    // Content.
    list: {
      heading: '#f2f2f2',
      headingShadow: '#fafafa',
      methods: '#f5f5f5',
      methodBorder: '#bdbdbd',
      methodShadow: '#f2f2f2',
      methodUnknown: '#fffcda'
    }
  },
  dark: {
    ...shared,

    // Primary theme colours.
    background: '#333',
    border: '#414141',
    color: '#fff',
    colorSubtle: '#ccc',
    link: '#FFF6A7',
    linkHoverFocus: '#fff',
    linkActive: '#BB5EC2',
    shadow: '#111',
    textShadow: '#111',

    // Layout sections.
    navigation: {
      discord: 'rgba(113, 136, 218, 0.5)',
      discordHover: 'rgba(113, 136, 218, 0.8)',
      gradientStart: 'rgba(33, 33, 33, 0.9)',
      gradientEnd: 'rgba(51, 51, 51, 1)',
      patreon: 'rgba(249, 104, 84, 0.5)',
      patreonHover: 'rgba(249, 104, 84, 0.8)'
    },

    // Components.
    panel: {
      background: '#333',
      headingBorder: '#616161'
    },
    progress: {
      background: '#616161',
      bar: '#ccc'
    },

    // Content.
    list: {
      heading: '#414141',
      headingShadow: '#333',
      methods: '#3d3d3d',
      methodBorder: '#616161',
      methodShadow: '#333',
      methodUnknown: '#38372f'
    }
  }
};

/**
 * `ThemeContext` is the context API for themes.
 */
export const ThemeContext = React.createContext(
  themes.light
);