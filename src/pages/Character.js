import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import InlineLoader from 'components/content/InlineLoader';
import PageLoader from 'components/content/PageLoader';
import Panel from 'components/content/Panel';
import Character from 'js/character';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Character';

const useStyles = createUseStyles(style);

function CharacterPage({
  match,
  ...rest
}) {
  const characterFromContext = useContext(CharacterContext);
  const user = useContext(UserContext);
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { character: pageLocale } = locale.pages;

  const { characterId } = match.params;

  const [character, setCharacter] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [verificationCodeCopied, setVerificationCodeCopied] = useState(false);

  useEffect(() => {
    const character = new Character({
      id: Number(characterId)
    });

    (async () => {
      const data = await character.getData();
      setCharacter(data);

      const achievements = await character.getAchievements();

      // // If this is the active character update the context entry.
      // if (Number(characterId) === characterFromContext.id) {
      //   character.change({
      //     ...character,
      //     achievements: 
      //   });
      // }
    })();
  }, [characterId]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }

    const uidBase32 = parseInt(user.data.uid, 32).toString(16);

    setVerificationCode(`apkallu_${uidBase32}`);
  }, [user])

  if (!character) {
    return (
      <PageLoader text={pageLocale.communicatingWithXIVAPI} />
    );
  }

  const {
    avatar,
    bio,
    dc: dataCenter,
    freeCompany,
    name,
    world
  } = character;

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
  async function handleVerificationCodeCopy() {
    if (!canCopyOnClick) {
      return;
    }

    navigator.clipboard.writeText(verificationCode).then(() => setVerificationCodeCopied(true));
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div
          className={classes.avatar}
          style={{
            backgroundImage: `url(${avatar})`
          }}
        />
        <section className={classes.details}>
          <h1 className={classes.name}>
            {name}
            {freeCompany && (
              <React.Fragment>
                {' '}
                <span className={classes.freeCompanyTag}>
                  «{freeCompany.tag}»
                </span>
              </React.Fragment>
            )}
          </h1>
          <p className={classes.tagline}>
            {dataCenter}
            {' '}
            <span className="fal fa-long-arrow-right" />
            {' '}
            {world}
          </p>
        </section>
        <section className={classes.actions}>
        </section>
      </header>
      <Panel>
        <InlineLoader text={pageLocale.fetchingCharacterAchievements} />
      </Panel>
      {bio && (
        <section className={classes.bioWrapper}>
          <h2 className={classes.bioHeading}>
            {pageLocale.lodestoneBio}
          </h2>
          <blockquote className={classes.bio}>
            <span className={`fas fa-quote-left ${classes.bioQuoteIcon}`}/>
            {bio}
          </blockquote>
        </section>
      )}
      <section className={classes.verifyCharacter}>
        <h2 className={classes.verifyCharacterHeading}>
          {pageLocale.verifyOwnership}
        </h2>
        <p className={classes.help}>
          {pageLocale.whyVerifyOwnership}
        </p>
        {user.isLoggedIn
          ? (
            <React.Fragment>
              <p className={classes.help}>
                {pageLocale.howToVerifyOwnership}
              </p>
              <ol className={classes.list}>
                <li className={classes.listItem}>
                  {pageLocale.lodestoneSignIn}
                  <br />
                  <a
                    href={locale.links.lodestone}
                    className={classes.hyperlink}
                  >
                    {locale.links.lodestone}
                  </a>
                </li>
                <li className={classes.listItem}>
                  {pageLocale.lodestoneEditProfile}
                  <br />
                  <a 
                    href={locale.links.lodestoneProfileEdit}
                    className={classes.hyperlink}
                  >
                    {locale.links.lodestoneProfileEdit}
                  </a>
                </li>
                <li className={classes.listItem}>
                  {pageLocale.lodestoneVerificationCode}
                  <br />
                  {canCopyOnClick
                    ? (
                      <React.Fragment>
                        <span
                          className={`${classes.verificationCode} ${classes.verificationCodeCopyOnClick}`}
                          role="button"
                          tabIndex={0}
                          onClick={handleVerificationCodeCopy}
                          onKeyDown={(event) => event.which === 13 && handleVerificationCodeCopy()}
                        >
                          {verificationCode}
                        </span>
                        {' '}
                        <span className={`${classes.copyHelper} ${verificationCodeCopied ? classes.copyHelperCopied : ''}`}>
                          <span className="fal fa-clipboard" />
                          {' '}
                          {locale.info.copied}
                        </span>
                      </React.Fragment>
                    ) : (
                      <span className={classes.verificationCode}>
                        {verificationCode}
                      </span>
                    )
                  }
                </li>
              </ol>
              <div className={classes.control}>
                <button
                  className={classes.button}
                  type="button"
                >
                  {locale.actions.checkForVerificationCode}
                </button>
              </div>
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <p className={classes.help}>
                {pageLocale.accountRequired}
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
      </section>
    </React.Fragment>
  )
}

export default withRouter(CharacterPage);