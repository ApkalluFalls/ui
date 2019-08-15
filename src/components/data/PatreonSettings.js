import React, { useContext, useEffect, useState } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/PatreonSettings';

const useStyles = createUseStyles(style);

function PatreonSettings({ inheritedClasses }) {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { patreonSettings: componentLocale } = locale.components;

  /**
   * Attempt to connect to a user's Patreon account.
   */
  function handleConnect() {

  }

  return (
    <div className={classes.patreonSettings}>
      <p className={inheritedClasses.help}>{componentLocale.about}</p>
      <div className={classes.control}>
        <button
          className={`${classes.button} ${classes.connectButton}`}
          type="button"
          onClick={handleConnect}
          onKeyDown={(event) => event.which === 13 && handleConnect()}
        >
          <span className={`fab fa-patreon`} />
          {' '}
          {locale.common.connectWithPatreon}
        </button>
      </div>
    </div>
  );
}

export default PatreonSettings;