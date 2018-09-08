/**
 * The `<Navigation />` layout component wraps the sidebar.
 * @module [{components/layout}Navigation]
 */
import React from "react";
import injectSheet, { ThemeProvider } from 'react-jss';
import { Link } from 'react-router-dom';
import AFComponent from "components/AFComponent";

import style from "styles/layout/Navigation";

// Components.
import Progress from "components/common/Progress";

const Navigation = injectSheet(style)(({classes, locale}) => {
  const pages = [{
    icon: "fa-trophy",
    text: locale.common.achievements,
    url: 'achievements'
  }, {
    icon: "fa-paw",
    text: locale.common.minions,
    url: 'minions'
  }, {
    icon: "fa-crow",
    text: locale.common.mounts,
    url: 'mounts'
  }, {
    icon: "fa-tag",
    text: locale.common.titles,
    url: 'titles'
  }, {
    icon: "fa-smile",
    text: locale.common.emotes,
    url: 'emotes'
  }, {
    icon: "fa-music",
    text: locale.common.orchestrionRolls,
    url: 'orchestrion-rolls'
  }, {
    icon: "fa-loveseat",
    text: locale.common.chocoboBarding,
    url: 'chocobo-barding'
  }];

  return (
    <nav className={classes.navigation}>
      <header className={classes.header}>
        <span className={classes.logo} />
        <h1 className={classes.title}>Apkallu Falls</h1>
      </header>
      <section className={classes.links}>
        <ul className={classes.linksList}>
          {pages.map(page => (
            <li key={page.url} className={classes.linksListItem}>
              <Link to={page.url} className={classes.link}>
                <span className={classes.linkIcon}>
                  <span class={`fal ${page.icon}`} />
                </span>
                <span className={classes.linkText}>
                  {page.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <footer className={classes.footer}>
      </footer>
    </nav>
  );
});

export default () => (
  <AFComponent style={style}>
    <Navigation />
  </AFComponent>
);