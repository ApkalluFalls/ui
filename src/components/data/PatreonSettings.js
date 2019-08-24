import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import InlineLoader from 'components/content/InlineLoader';
import { paths } from 'js/routes';
import Server from 'js/server';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/PatreonSettings';

const useStyles = createUseStyles(style);

function PatreonSettings({
  history,
  inheritedClasses
}) {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { patreonSettings: componentLocale } = locale.components;
  // const user = useContext(UserContext);

  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const cacheKey = `patreon-${user.data.uid}`;
  //   let cachedAccessData = JSON.parse(sessionStorage.getItem(cacheKey));
  //   const server = new Server();

  //   (async () => {
  //     if (!cachedAccessData || cachedAccessData.expires < Number(new Date())) {
  //       const { search } = history.location;
      
  //       if (!search) {
  //         setLoading(false);
  //         return;
  //       }

  //       const codeMatch = search.match(/code\=([A-Za-z0-9]+)/);

  //       if (!Array.isArray(codeMatch) || codeMatch.length < 2) {
  //         setLoading(false);
  //         return;
  //       }

  //       const code = codeMatch[1];

  //       // Silently remove the query parameters from the URL.
  //       window.history.replaceState({}, document.title, paths.patreon);

  //       const accessData = await new Promise(async (resolve) => {
  //         try {
  //           const response = await server.post('patreon', { code });
  //           resolve(response.data);
  //         } catch (exception) {
  //           resolve(false);
  //         }
  //       });

  //       if (!accessData) {
  //         setError(true);
  //         setLoading(false);
  //         return;
  //       }

  //       cachedAccessData = {
  //         accessToken: accessData['access_token'],
  //         expires: Number(new Date()) + accessData['expires_in']
  //       };

  //       sessionStorage.setItem(cacheKey, JSON.stringify(cachedAccessData));
  //     }

  //     const patreonUser = await server.post('patreon-user', {
  //       accessToken: cachedAccessData.accessToken
  //     });

  //     console.info(patreonUser);
  //   })();
  // }, []);

  // if (loading) {
  //   return (
  //     <InlineLoader text={locale.info.loading} />
  //   );
  // }

  return (
    <div className={classes.patreonSettings}>
      <p className={inheritedClasses.help}>
        {componentLocale.about}
      </p>
      {/* {error && (
        <p className={`${inheritedClasses.help} ${classes.helpError}`}>
          {componentLocale.error}
        </p>
      )} */}
      <div className={classes.control}>
        <button
          className={`${classes.button} ${classes.connectButton}`}
          type="button"
          disabled
        >
          {locale.info.comingSoon}
        </button>
        {/* <a
          className={`${classes.button} ${classes.connectButton}`}
          href={`https://www.patreon.com/oauth2/authorize?response_type=code&client_id=wWS9R7I2lz9G4PowKqlx7MyIUlrCeEQ81byBw7zpnoUDmDhdIhKC28dJEXylK7rn&redirect_uri=http%3A%2F%2F127.0.0.1%3A7000%2Fpatreon`}
        >
          <span className={`fab fa-patreon`} />
          {' '}
          {locale.common.connectWithPatreon}
        </a> */}
      </div>
    </div>
  );
}

export default withRouter(PatreonSettings);