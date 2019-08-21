import React, { useContext } from 'react';
import { APIContext } from 'contexts/api';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/Footer';

const useStyles = createUseStyles(style);

function Footer() {
  const api = useContext(APIContext);
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { footer: componentLocale } = locale.components;

  return (
    <footer className={classes.footer}>
      <p className={classes.copyright}>
        © Apkallu Falls
        {' '}
        <span className={classes.apiVersion}>
          &mdash; API v1.3.{api.version}
        </span>
      </p>
      <p className={classes.disclaimer}>
        {componentLocale.squareEnixDisclaimer}
      </p>
    </footer>
  );
}

export default Footer;