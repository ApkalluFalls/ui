import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Panel from 'components/content/Panel';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Error404';

function Error404() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);
  const { error404: pageLocale } = locale.pages;

  return (
    <React.Fragment>
      <h1 className={classes.heading}>
        404 &mdash; {pageLocale.heading}
      </h1>
      <p className={classes.subheading}>
        {pageLocale.about}
      </p>
    </React.Fragment>
  )
}

export default Error404;