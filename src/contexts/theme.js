import React from "react";

export const themes = {
  light: {
    brand: '#ffee58',
    background: '#f5f5f5',
    color: '#212121',
    shadow: '#212121',
    subtleBackground: '#bdbdbd',
    navigation: {
      background: 'rgba(31, 21, 0, 0.7)'
    }
  }
};

export const ThemeContext = React.createContext(
  themes.light
);