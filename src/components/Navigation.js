import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext, themes } from 'contexts/theme';
import CharacterPortrait from 'components/content/CharacterPortrait';
import ContentProgress from 'components/content/ContentProgress';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/Navigation';
import { paths } from 'js/routes';

function Navigation() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);

  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState((
    localStorage && localStorage.getItem('theme') === 'dark'
  ));

  const {
    common: contentText
  } = locale;

  const contents = [{
    api: 'achievements',
    path: paths.achievements,
    title: contentText.achievements,
    fakeProgress: 4850
  }, {
    api: 'minions',
    path: paths.minions,
    title: contentText.minions,
    fakeProgress: 76
  }, {
    api: 'mounts',
    path: paths.mounts,
    title: contentText.mounts,
    fakeProgress: 24
  }, {
    api: 'emotes',
    path: paths.emotes,
    title: contentText.emotes,
    fakeProgress: 94
  }, {
    api: 'orchestrion',
    path: paths.orchestrion,
    title: contentText.orchestrionRolls,
    fakeProgress: 63
  }, {
    api: 'barding',
    path: paths.barding,
    title: contentText.barding,
    fakeProgress: 12
  }];

  const onThemeChange = event => {
    if (isDarkThemeEnabled) {
      localStorage && localStorage.setItem('theme', 'light');
      setIsDarkThemeEnabled(false);
    } else {
      localStorage && localStorage.setItem('theme', 'dark');
      setIsDarkThemeEnabled(true);
    }

    window.location.reload();
  };

  return (
    <nav className={classes.navigation}>
      <div className={classes.wrapper}>
        <header className={classes.header}>
          <span className={classes.logo} />
          <span className={classes.title}>
            Apkallu Falls
          </span>
        </header>
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
                className={classes.link}
                activeClassName={classes.linkActive}
                to={content.path}
              >
                <ContentProgress source={content} />
              </NavLink>
            </li>
          ))}
        </ul>
        <form className={classes.options}>
          <label
            className={classes.label}
            htmlFor="theme"
          >
            <span className={classes.control}>
              <input
                type="checkbox"
                id="theme"
                checked={isDarkThemeEnabled}
                onChange={onThemeChange}
              />
            </span>
            <span className={classes.labelText}>
              {locale.labels.darkMode}
              {' '}
              <span className={classes.labelTextInfo}>
                ({locale.info.reloadsPage})
              </span>
            </span>
          </label>
          <a
            className={`${classes.externalLink} ${classes.discord}`}
            href="https://discord.gg/VZ9BhKy"
          >
            Chat on Discord
          </a>
          <a
            className={`${classes.externalLink} ${classes.patreon}`}
            href="https://www.patreon.com/bePatron?u=8135445"
          >
            Become a Patron
          </a>
        </form>
      </div>
    </nav>
  );
}

export default Navigation;