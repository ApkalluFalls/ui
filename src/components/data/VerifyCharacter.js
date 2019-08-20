import firebase from "firebase/app";
import React, { useContext, useEffect, useState } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import Character from 'js/character';
import Server from 'js/server';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/VerifyCharacter';

const useStyles = createUseStyles(style);

function VerifyCharacter({
  id: characterId,
  ...character
}) {
  const classes = useStyles(useContext(ThemeContext));
  const user = useContext(UserContext);
  const { locale } = useContext(LocalisationContext);
  const { verifyCharacter: componentLocale } = locale.components;

  const [checking, setChecking] = useState(false);
  const [code, setCode] = useState();
  const [codeCopied, setCodeCopied] = useState(false);
  const [codeFound, setCodeFound] = useState(false);
  const [codeMissing, setCodeMissing] = useState(false);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }

    const uidBase32 = parseInt(user.data.uid, 32);
    setCode(`apkallu_${(uidBase32 + user.sessionStart).toString(16)}`);
  }, [user]);

  /**
   * Boolean to determine whether the browser supports the clipboard API, used to automatically
   * copy the verificaiton code to the user's clipboard on click.
   */
  const canCopyOnClick = (
    navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function'
  );

  /**
   * Copy the verification code to the user's clipboard.
   */
  async function handleCodeCopy() {
    if (!canCopyOnClick) {
      return;
    }

    navigator.clipboard.writeText(code).then(() => setCodeCopied(true));
  }

  /**
   * Check if the verification code matches.
   * If true, this updates the verifiedCharacters array to include the new character.
   */
  async function checkVerificationCode() {
    setChecking(true);

    /**
     * First we check the bio from the user's side to block repeated failed attempts getting
     * through to the Apkallu Falls server.
     */
    const data = await new Character({
      id: characterId
    }).getData(true);

    if (!data || !data.bio) {
      setChecking(false);
      return;
    }

    if (!(new RegExp(code).test(data.bio))) {
      setCodeMissing(true);
      setChecking(false);
      return;
    }

    setCodeFound(true);

    // If the code exists, attempt verification.
    const server = await new Server().post('verify', {
      characterId: characterId,
      sessionStart: user.sessionStart
    });

    const { isCodeMatch, verifiedCharacters } = server.data;

    // If the code no longer matches, mark the code as missing.
    if (!isCodeMatch) {
      setCodeMissing(true);
    }

    setChecking(false);
    setCodeFound(false);

    // If there are no verified characters (including the above code match check), return.
    if (!verifiedCharacters) {
      return;
    }

    // Update the Local Storage store to include the new character.
    localStorage.setItem('store', JSON.stringify({
      ...JSON.parse(localStorage.getItem('store')),
      verified: verifiedCharacters
    }));

    /**
     * Merge the current parsed verified characters object with the response from the server.
     * This preserves avatar data, which the server itself doesn't store.
     */
    user.setVerifiedCharacters(verifiedCharacters.map(verifiedCharacter => {
      if (verifiedCharacter.id === Number(characterId)) {
        return {
          ...verifiedCharacter,
          ...character
        }
      }

      return {
        ...verifiedCharacter,
        ...user.verifiedCharacters.find((
          userVerifiedCharacter => userVerifiedCharacter.id === verifiedCharacter.id
        ))
      }
    }));
  }

  return (
    <React.Fragment>
      <h2 className={classes.heading}>
        {componentLocale.verifyOwnership}
      </h2>
      <p className={`${classes.help} ${classes.helpUnimportant}`}>
        {componentLocale.whyVerifyOwnership}
      </p>
      {user.isLoggedIn
        ? (
          <React.Fragment>
            <p className={`${classes.help} ${classes.helpUnimportant}`}>
              {componentLocale.howToVerifyOwnership}
            </p>
            <ol className={classes.list}>
              <li className={`${classes.listItem} ${classes.listItemUnimportant}`}>
                {locale.common.lodestoneSignIn}
                <br />
                <a
                  href={locale.links.lodestone}
                  className={classes.hyperlink}
                  target="__blank"
                >
                  {locale.links.lodestone}
                </a>
              </li>
              <li className={`${classes.listItem} ${classes.listItemUnimportant}`}>
                {componentLocale.lodestoneEditProfile}
                <br />
                <a 
                  href={locale.links.lodestoneProfileEdit}
                  className={classes.hyperlink}
                  target="__blank"
                >
                  {locale.links.lodestoneProfileEdit}
                </a>
              </li>
              <li className={`${classes.listItem} ${classes.listItemUnimportant}`}>
                {componentLocale.lodestoneVerificationCode}
                <br />
                {canCopyOnClick
                  ? (
                    <React.Fragment>
                      <span
                        className={`${classes.code} ${classes.codeCopyOnClick}`}
                        role="button"
                        tabIndex={0}
                        onClick={handleCodeCopy}
                        onKeyDown={(event) => event.which === 13 && handleCodeCopy()}
                      >
                        {code}
                      </span>
                      {' '}
                      <span className={`${classes.copyHelper} ${codeCopied ? classes.copyHelperCopied : ''}`}>
                        <span className="fal fa-clipboard-check" />
                        {' '}
                        {locale.info.copied}
                      </span>
                    </React.Fragment>
                  ) : (
                    <span className={classes.code}>
                      {code}
                    </span>
                  )
                }
              </li>
            </ol>
            {codeMissing && (
              <p className={`${classes.help} ${classes.helpError}`}>
                {componentLocale.codeMissing}
              </p>
            )}
            <div className={classes.control}>
              <button
                className={`${classes.button} ${classes.buttonSmall}`}
                type="button"
                disabled={checking}
                onClick={checkVerificationCode}
                onKeyDown={(event) => event.which === 13 && checkVerificationCode()}
              >
                {checking
                  ? (
                    <React.Fragment>
                      <span className="fas fa-cog fa-spin" />
                      {' '}
                      {codeFound
                        ? locale.info.addingCharacter
                        : locale.info.checkingLodestoneBio
                      }
                    </React.Fragment>
                  ) : locale.actions.verifyOwnership
                }
              </button>
            </div>
            <p className={`${classes.help} ${classes.helpUnimportant}`}>
              {componentLocale.codeExpiration}
            </p>
            <p className={`${classes.help} ${classes.helpUnimportant}`}>
              {componentLocale.rememberToRemoveCode}
            </p>
          </React.Fragment>
        )
        : (
          <React.Fragment>
            <p className={`${classes.help} ${classes.helpUnimportant}`}>
              {componentLocale.accountRequired}
            </p>
            <Link to={paths.authentication}>
              <span className={classes.button}>
                <span className="fal fa-user-plus" />
                {' '}
                {locale.actions.signInOrCreateAccount}
              </span>
            </Link>
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
}

export default VerifyCharacter;