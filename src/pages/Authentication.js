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
  const [isEmailAddressInvalid, setIsEmailAddressInvalid] = useState(false);
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    (async () => {
    })();
  }, []);

  /**
   * If the form is submitted (via a keyboard return key), determine whether the user is trying to
   * sign in or create an account and route them through that handler.
   */
  function handleFormSubmit(event) {
    event.preventDefault();

    if (passwordConfirmation) {
      handleCreateAccount();
      return;
    }

    handleSignIn();
  }

  /**
   * Validate fields and attempt to create a new account.
   */
  function handleCreateAccount() {
    validateEmailAddress();
    validatePassword();

    if (isEmailAddressInvalid || isPasswordTooShort || isPasswordMismatch) {
      return;
    }
  }

  /**
   * Validate fields and attempt to sign the user into their account.
   */
  function handleSignIn() {
    validateEmailAddress();

    if (isEmailAddressInvalid) {
      return;
    }
  }

  /**
   * Validate fields and attempt to reset the user's password.
   */
  function handleForgottenPassword(event) {
    // We call preventDefault here to stop the form from being submitted.
    event.preventDefault();
    validateEmailAddress();

    if (isEmailAddressInvalid) {
      return;
    }
  }

  /**
   * Validate the email address.
   */
  function validateEmailAddress() {
    setIsEmailAddressInvalid(!(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    ).test(emailAddress));
  }

  /**
   * Validate the password.
   */
  function validatePassword() {
    if (passwordConfirmation) {
      setIsPasswordMismatch(password !== passwordConfirmation);
    }

    setIsPasswordTooShort(password.length < 8);
  }

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p className={classes.help}>{pageLocale.about}</p>
      <Panel className={classes.formArea}>
        <form onSubmit={handleFormSubmit}>
          <div className={classes.control}>
            <label
              htmlFor="email-address"
              className={classes.label}
            >
              {pageLocale.emailAddress}
            </label>
            <input
              id="email-address"
              className={`${classes.input} ${isEmailAddressInvalid ? classes.inputValidationError : ''}`}
              placeholder="tequila@apkallufalls.com"
              type="text"
              autoFocus
              onChange={(event) => setEmailAddress(event.currentTarget.value)}
            />
            {isEmailAddressInvalid && (
              <p className={classes.validationError}>
                {pageLocale.emailAddressInvalid}
              </p>
            )}
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
              className={`${classes.input} ${isPasswordTooShort ? classes.inputValidationError : ''}`}
              placeholder="●●●●●●●●●●●●●●●●"
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            {isPasswordTooShort && (
              <p className={classes.validationError}>
                {pageLocale.passwordTooShort}
              </p>
            )}
          </div>
          <div className={classes.control}>
            <button
              className={classes.button}
              disabled={!(emailAddress && password)}
            >
              {pageLocale.signIn}
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
                className={`${classes.input} ${isPasswordMismatch ? classes.inputValidationError : ''}`}
                placeholder="●●●●●●●●●●●●●●●●"
                type="password"
                onChange={(event) => setPasswordConfirmation(event.currentTarget.value)}
              />
              {isPasswordMismatch && (
                <p className={classes.validationError}>
                  {pageLocale.passwordMismatch}
                </p>
              )}
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
          <div className={`${classes.control} ${classes.controlCollapsed}`}>
            <button
              className={classes.linkButton}
              type="button"
              disabled={!emailAddress}
              onClick={handleForgottenPassword}
              onKeyDown={(event) => event.which === 13 && handleForgottenPassword(event)}
            >
              {pageLocale.forgottenPassword}
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