import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Panel from 'components/content/Panel';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Authentication';

function Home() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);
  const { authentication: pageLocale } = locale.pages;

  // State.
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    (async () => {
    })();
  }, [])

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p className={classes.help}>{pageLocale.about}</p>
      <Panel className={classes.formArea}>
        <form>
          <div className={classes.control}>
            <label
              htmlFor="email-address"
              className={classes.label}
            >
              {pageLocale.emailAddress}
            </label>
            <input
              id="email-address"
              className={classes.input}
              placeholder="tequila@apkallufalls.com"
              type="text"
              autoFocus
              onChange={(event) => setEmailAddress(event.currentTarget.value)}
            />
          </div>
          <div className={classes.control}>
            <label
              htmlFor="password"
              className={classes.label}
            >
              {pageLocale.password}
            </label>
            <input
              id="password"
              className={classes.input}
              placeholder="●●●●●●●●●●●●●●●●"
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <div className={classes.control}>
            <button
              className={classes.button}
              disabled={!(emailAddress && password)}
            >
              {pageLocale.signIn}
            </button>
          </div>
          <div className={`${classes.control} ${classes.controlCollapsed}`}>
            <button
              className={classes.linkButton}
              disabled={!emailAddress}
            >
              {pageLocale.forgottenPassword}
            </button>
          </div>
          {emailAddress && password && (
            <div className={classes.control}>
              <label
                htmlFor="password-confirm"
                className={classes.label}
              >
                {pageLocale.confirmPassword}
              </label>
              <input
                id="password-confirm"
                className={classes.input}
                placeholder="●●●●●●●●●●●●●●●●"
                type="password"
                onChange={(event) => setPasswordConfirmation(event.currentTarget.value)}
              />
            </div>
          )}
          <div className={classes.control}>
            <button
              className={classes.button}
              disabled={!(emailAddress && password && passwordConfirmation)}
            >
              {pageLocale.createAccount}
            </button>
          </div>
          <p className={classes.alternativeMethods}>
            {pageLocale.alternativeMethods}
          </p>
          <div className={classes.control}>
            <button
              className={`${classes.button} ${classes.google}`}
            >
              Google
            </button>
          </div>
          <div className={classes.control}>
            <button
              className={`${classes.button} ${classes.facebook}`}
            >
              Facebook
            </button>
          </div>
          <div className={classes.control}>
            <button
              className={`${classes.button} ${classes.twitter}`}
            >
              Twitter
            </button>
          </div>
        </form>
      </Panel>
    </React.Fragment>
  )
}

export default Home;