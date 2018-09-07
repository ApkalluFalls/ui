/**
 * The `<Navigation />` layout component wraps the sidebar.
 * @module [ {js/layout} Navigation ]
 */
import React from "react";
import injectSheet, { ThemeProvider } from 'react-jss';
import { ThemeContext, themes } from 'contexts/theme';

import style from "styles/layout/Navigation";

const Navigation = injectSheet(style)(({classes}) => (
  <nav className={classes.navigation}>
    <header className={classes.header}>
      <span className={classes.logo} />
      <h1 className={classes.title}>Apkallu Falls</h1>
    </header>
    <section className={classes.links}>
    </section>
    <footer className={classes.footer}>
    </footer>
  </nav>
));

export default () => (
  <ThemeContext.Consumer>
    {theme => (
      <ThemeProvider theme={themes[theme]}>
        <Navigation />
      </ThemeProvider>
    )}
  </ThemeContext.Consumer>
);