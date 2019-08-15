import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Panel from 'components/content/Panel';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Character';

const useStyles = createUseStyles(style);

function Character({
  ...rest
}) {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { character: pageLocale } = locale.pages;

  console.warn(rest);

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

export default withRouter(Character);