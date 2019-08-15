import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext, themes } from 'contexts/theme';
import CharacterPortrait from 'components/content/CharacterPortrait';
import ContentProgress from 'components/content/ContentProgress';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/Navigation';
import { paths } from 'js/routes';

const useStyles = createUseStyles(style);

function Navigation() {
  const theme = useContext(ThemeContext);
  const classes = useStyles(useContext(ThemeContext));
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
    title: contentText.achievements
  }, {
    api: 'minions',
    path: paths.minions,
    title: contentText.minions,
    requiresSignIn: true
  }, {
    api: 'mounts',
    path: paths.mounts,
    title: contentText.mounts,
    requiresSignIn: true
  }, {
    api: 'emotes',
    path: paths.emotes,
    title: contentText.emotes,
    requiresSignIn: true
  }, {
    api: 'orchestrion',
    path: paths.orchestrion,
    title: contentText.orchestrionRolls,
    requiresSignIn: true
  }, {
    api: 'barding',
    path: paths.barding,
    title: contentText.barding,
    requiresSignIn: true
  }];

  const onThemeChange = event => {
    /**
     * The commented out `theme.change` calls here do not cause JSS to regenerate classes. For now
     * we need to reload the page to update the theme instead. This isn't ideal, but requires
     * further investigation before it can be resolved.
     */
    if (isDarkThemeEnabled) {
      localStorage && localStorage.setItem('theme', 'light');
      setIsDarkThemeEnabled(false);
      theme.change(themes.light);
      // window.location.reload();
      return;
    }

    localStorage && localStorage.setItem('theme', 'dark');
    setIsDarkThemeEnabled(true);
    theme.change(themes.dark);
    // window.location.reload();
  };

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
                className={`${classes.link} ${window.signedInCharacter || !content.requiresSignIn ? '' : classes.linkCollapsed}`}
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
            <span className="fab fa-discord" /> Chat on Discord
          </a>
          <a
            className={`${classes.externalLink} ${classes.patreon}`}
            href="https://www.patreon.com/bePatron?u=8135445"
          >
            <span className="fab fa-patreon" /> Become a Patron
          </a>
        </form>
      </div>
    </nav>
  );
}

export default Navigation;