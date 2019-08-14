import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Panel from 'components/content/Panel';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Authentication';

function Authentication({ history }) {
  // If the user is already signed in, redirect them to their account page.
  const character = useContext(CharacterContext);
  if (!character.loading && character.type) {
    history.push(paths.account);
  }

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
  const [firebaseValidationError, setFirebaseValidationError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (validateEmailAddress() || validatePassword()) {
      return;
    }

    setLoading(true);

    firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
      .then(response => {
        console.info(response);
      })
      .catch(error => {
        parseFirebaseError(error.code);
        setLoading(false);
      });
  }

  /**
   * Validate fields and attempt to sign the user into their account.
   */
  function handleSignIn() {
    if (validateEmailAddress()) {
      return;
    }

    setLoading(true);

    firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push(paths.account);
      })
      .catch(error => {
        parseFirebaseError(error.code);
        setLoading(false);
      });
  }

  /**
   * Validate fields and attempt to reset the user's password.
   * @param {DOMEvent} event - The DOM event which triggered the method.
   */
  function handleForgottenPassword(event) {
    // We call preventDefault here to stop the form from being submitted.
    event.preventDefault();

    if (validateEmailAddress()) {
      return;
    }

    setResetEmailSent(true);
    firebase.auth().sendPasswordResetEmail(emailAddress);
  }

  /**
   * Attempt sign in through the specified provider.
   * @param {String} source - The provider to use.
   */
  function handleProviderSignIn(source) {
    let provider;

    switch (source) {
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;

      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;

      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;

      default:
        return;
    }

    setLoading(true);

    firebase.auth().signInWithPopup(provider)
      .then(() => {
        history.push(paths.account);
      })
      .catch(error => {
        parseFirebaseError(error.code);
        setLoading(false);
      });
  }

  /**
   * Convert Firebase error codes into human-readable messages to display to the user.
   * @param {String} code - The Firebase error code.
   */
  function parseFirebaseError(code) {
    setFirebaseValidationError((() => {
      switch (code) {
        // Sign in.
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          return pageLocale.incorrectLoginDetails;

        case 'auth/popup-closed-by-user':
          return pageLocale.authenticationPopupClosed;

        default:
          console.warn(`Unhandled Firebase error code: ${code}.`)
          return pageLocale.unhandledFirebaseError;
      }
    })());
  }

  /**
   * Validate the email address and update state accordingly.
   * @returns {Boolean} `false` if the email is valid, `true` if invalid.
   */
  function validateEmailAddress() {
    const isEmailAddressInvalid = !(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    ).test(emailAddress);

    setIsEmailAddressInvalid(isEmailAddressInvalid);

    return isEmailAddressInvalid;
  }

  /**
   * Validate the password and update state accordingly.
   * @returns {Boolean} `false` if the password is valid, `true` if invalid.
   */
  function validatePassword() {
    const passwordTooShort = password.length < 8;
    let passwordMismatch;

    if (passwordConfirmation) {
      passwordMismatch = password !== passwordConfirmation;
      setIsPasswordMismatch(passwordMismatch);
    }

    setIsPasswordTooShort(passwordTooShort);

    return passwordMismatch || passwordTooShort;
  }

  if (character.loading) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p className={classes.help}>{pageLocale.about}</p>
      <Panel className={classes.formArea}>
        {firebaseValidationError && (
          <section className={classes.firebaseValidationError}>
            {firebaseValidationError}
          </section>
        )}
        {resetEmailSent && (
          <section className={classes.emailResetNotice}>
            {pageLocale.emailResetSent}
          </section>
        )}
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
              disabled={loading}
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
              disabled={loading}
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
              type="button"
              disabled={loading || !(emailAddress && password)}
              onClick={handleSignIn}
              onKeyDown={(event) => event.which === 13 && handleSignIn()}
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
                disabled={loading}
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
              type="button"
              disabled={loading || !(emailAddress && password && passwordConfirmation)}
              onClick={handleCreateAccount}
              onKeyDown={(event) => event.which === 13 && handleCreateAccount()}
            >
              {pageLocale.createAccount}
            </button>
          </div>
          <div className={`${classes.control} ${classes.controlCollapsed}`}>
            <button
              className={classes.linkButton}
              type="button"
              disabled={loading || !emailAddress}
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
              type="button"
              disabled={loading}
              onClick={() => handleProviderSignIn('google')}
              onKeyDown={(event) => event.which === 13 && handleProviderSignIn('google')}
            >
              Google
            </button>
          </div>
          <div className={classes.control}>
            <button
              className={`${classes.button} ${classes.facebook}`}
              type="button"
              disabled={loading}
              onClick={() => handleProviderSignIn('facebook')}
              onKeyDown={(event) => event.which === 13 && handleProviderSignIn('facebook')}
            >
              Facebook
            </button>
          </div>
          <div className={classes.control}>
            <button
              className={`${classes.button} ${classes.twitter}`}
              type="button"
              disabled={loading}
              onClick={() => handleProviderSignIn('twitter')}
              onKeyDown={(event) => event.which === 13 && handleProviderSignIn('twitter')}
            >
              Twitter
            </button>
          </div>
        </form>
      </Panel>
    </React.Fragment>
  )
}

export default withRouter(Authentication);