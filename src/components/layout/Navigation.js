/**
 * The `<Navigation />` layout component wraps the sidebar.
 * @module [{components/layout}Navigation]
 */
import React from "react";
import injectSheet, { ThemeProvider } from 'react-jss';
import { ThemeContext, themes } from 'contexts/theme';

import style from "styles/layout/Navigation";

// Components.
import Progress from "components/common/Progress";

const Navigation = injectSheet(style)(({classes}) => (
  <nav className={classes.navigation}>
    <header className={classes.header}>
      <span className={classes.logo} />
      <h1 className={classes.title}>Apkallu Falls</h1>
    </header>
    <section className={classes.links}>
      <Progress caption="Achievements" value={4} total={7} source="navigation" />
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