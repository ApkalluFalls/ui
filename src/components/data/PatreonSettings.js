import React, { useContext, useEffect, useState } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Server from 'js/server';

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
  async function handleConnect() {
    const server = new Server();
    const response = await server.get('verify');
    console.info(response);
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