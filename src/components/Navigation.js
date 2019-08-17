import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import CharacterPortrait from 'components/content/CharacterPortrait';
import ContentProgress from 'components/content/ContentProgress';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/Navigation';
import { paths } from 'js/routes';

const useStyles = createUseStyles(style);

function Navigation() {
  const classes = useStyles(useContext(ThemeContext));
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);
  const user = useContext(UserContext);

  const {
    common: contentText
  } = locale;

  const contents = [{
    api: 'achievements',
    path: paths.achievements,
    title: contentText.achievements,
    hasVisibleProgressBar: true,
  }, {
    api: 'minions',
    path: paths.minions,
    title: contentText.minions,
    hasVisibleProgressBar: !user.isLoggedIn || user.settings.enableManualTrackingMinions
  }, {
    api: 'mounts',
    path: paths.mounts,
    title: contentText.mounts,
    hasVisibleProgressBar: !user.isLoggedIn || user.settings.enableManualTrackingMounts
  }, {
    api: 'emotes',
    path: paths.emotes,
    title: contentText.emotes,
    hasVisibleProgressBar: !user.isLoggedIn || user.settings.enableManualTrackingEmotes
  }, {
    api: 'orchestrion',
    path: paths.orchestrion,
    title: contentText.orchestrionRolls,
    hasVisibleProgressBar: !user.isLoggedIn || user.settings.enableManualTrackingOrchestrion
  }, {
    api: 'barding',
    path: paths.barding,
    title: contentText.barding,
    hasVisibleProgressBar: !user.isLoggedIn || user.settings.enableManualTrackingBarding
  }];

  return (
    <nav className={classes.navigation}>
      <div className={classes.wrapper}>
        <Link to={paths.home}>
          <header className={classes.header}>
              <span className={classes.logo} />
              <span className={classes.title}>
                Apkallu Falls
              </span>
          </header>
        </Link>
        <div className={classes.character}>
          <CharacterPortrait />
        </div>
        <ul className={classes.links}>
          {contents.map(content => (
            <li
              className={classes.linkItem}
              key={content.path}
            >
              <NavLink
                className={`${classes.link} ${content.hasVisibleProgressBar ? '' : classes.linkCollapsed}`}
                activeClassName={classes.linkActive}
                to={content.path}
              >
                <ContentProgress source={content} />
              </NavLink>
            </li>
          ))}
        </ul>
        <section className={classes.options}>
          <a
            className={`${classes.externalLink} ${classes.discord}`}
            href="https://discord.gg/VZ9BhKy"
          >
            <span className="fab fa-discord" /> Chat on Discord
          </a>
          <a
            className={`${classes.externalLink} ${classes.patreon}`}
            href="https://www.patreon.com/bePatron?u=8135445"
          >
            <span className="fab fa-patreon" /> Become a Patron
          </a>
        </section>
      </div>
    </nav>
  );
}

export default Navigation;