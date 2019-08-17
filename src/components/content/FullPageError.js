import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/FullPageError';

const useStyles = createUseStyles(style);

function FullPageError({ text }) {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { fullPageError: componentLocale } = locale.components;

  return (
    <section className={classes.loader}>
      <h1 className={classes.caption}>
        <span className="fal fa-exclamation-triangle" />
        {' '}
        {componentLocale.heading}
      </h1>
      <p className={classes.help}>
        {componentLocale.about}
      </p>
      <p className={classes.help}>
        {componentLocale.ifThisKeepsHappening}
      </p>
      <div className={classes.control}>
        <a
          href="https://discord.gg/VZ9BhKy"
          className={`${classes.button} ${classes.discord}`}
        >
          <span className="fab fa-discord" />
          {' '}
          Chat on Discord
        </a>
      </div>
    </section>
  )
}

export default FullPageError;