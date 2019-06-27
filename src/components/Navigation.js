import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LocalisationContext, localisation } from 'contexts/localisation';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/Navigation';
import { paths } from 'js/routes';

function Navigation({
  classes
}) {
  const locale = useContext(LocalisationContext);
  const text = localisation[locale];

  const {
    common: contentText
  } = text;

  const contents = [{
    path: paths.barding,
    title: contentText.barding
  }, {
    path: paths.emotes,
    title: contentText.emotes
  }, {
    path: paths.minions,
    title: contentText.minions
  }, {
    path: paths.mounts,
    title: contentText.mounts
  }]

  return (
    <div className={classes.backdrop}>
      <nav className={classes.navigation}>
        <header className={classes.header}>
          <span className={classes.logo} />
          <span className={classes.title}>
            Apkallu Falls
          </span>
        </header>
        <ul className={classes.links}>
          {contents.map(content => (
            <li
              className={classes.linkItem}
              key={content.path}
            >
              <NavLink
                className={classes.link}
                activeClassName={classes.linkActive}
                to={content.path}
              >
                <span className={classes.linkText}>
                  {content.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default injectSheet(style)(Navigation);