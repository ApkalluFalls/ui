import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import InlineLoader from 'components/content/InlineLoader';
import PageLoader from 'components/content/PageLoader';
import Panel from 'components/content/Panel';
import CharacterStats from 'components/data/CharacterStats';
import VerifyCharacter from 'components/data/VerifyCharacter';
import API from 'js/api';
import Character from 'js/character';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Character';

const useStyles = createUseStyles(style);

function CharacterPage({ match }) {
  const characterFromContext = useContext(CharacterContext);
  const user = useContext(UserContext);
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { character: pageLocale } = locale.pages;

  const { characterId } = match.params;

  const [character, setCharacter] = useState();
  const [achievements, setAchievements] = useState();
  const [unverifying, setUnverifying] = useState(false);

  useEffect(() => {
    const character = new Character({
      id: Number(characterId)
    });

    (async () => {
      const data = await character.getData();
      setCharacter(data);

      const achievements = await character.getAchievements();
      setAchievements(achievements);

      if (achievements.isPrivate || Number(characterId) !== characterFromContext.id) {
        return;
      }

      // If this is the active character update the context entry.
      characterFromContext.setAchievements(achievements.list);
    })();
  }, [characterId]);

  function getErrorOutput() {
    let icon = 'frown';
    let title;
    let description;

    switch (character.errorCode) {
      case 404:
        title = pageLocale.characterNotFound;
        description = pageLocale.characterNotFoundDescription;
        break;
      default:
        icon = 'sad-cry';
        title = locale.common.anUnknownErrorOccurred;
        description = locale.common.pleaseTryAgain;
        break;
    }

    return (
      <Panel>
        <p className={classes.helpHeading}>
          <span className={`fal fa-${icon}`} />
          {' '}
          {title}
        </p>
        <p className={classes.help}>
          {description}
        </p>
      </Panel>
    )
  }

  if (!character) {
    return (
      <PageLoader text={pageLocale.communicatingWithXIVAPI} />
    );
  }

  const {
    avatar,
    bio,
    dc: dataCenter,
    error,
    freeCompany,
    name = pageLocale.characterErrorName,
    world = pageLocale.characterErrorServer
  } = character;

  document.title = `${name} - Apkallu Falls`;

  const characterIsVerified = (
    Array.isArray(user.verifiedCharacters)
    && user.verifiedCharacters.find((
      character => Number(character.id) === Number(characterId)
    ))
  );

  /**
   * Remove verification status from the character within Firebase and update the user context to
   * reflect the change.
   */
  async function unverifyCharacter() {
    if (!user.isLoggedIn || !window.confirm(locale.info.unverifyCharacter)) {
      return;
    }

    setUnverifying(true);

    const filteredVerifiedCharacters = user.verifiedCharacters.filter((
      character => character.id !== Number(characterId)
    ));

    const formattedVerifiedCharacters = filteredVerifiedCharacters.map(character => {
      const response = {
        '@': character['@'],
        id: character.id
      }

      if (character.main) {
        response.main = true;
      }

      return response;
    });

    const api = new API(undefined, user.data.uid);
    await api.db('verified', formattedVerifiedCharacters);

    setUnverifying(false);
    user.setVerifiedCharacters(filteredVerifiedCharacters)
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div
          className={classes.avatar}
          style={avatar && {
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
            {dataCenter && (
              <React.Fragment>
                {dataCenter}
                {' '}
                <span className="fal fa-long-arrow-right" />
                {' '}
              </React.Fragment>
            )}
            {world}
          </p>
        </section>
        <section className={classes.actions}>
        </section>
      </header>
      {error
        ? getErrorOutput()
        : (
          <React.Fragment>
            <Panel>
              {achievements
                ? <CharacterStats achievements={achievements} />
                : <InlineLoader text={pageLocale.fetchingCharacterAchievements} />
              }
            </Panel>
            {bio && (
              <section className={classes.section}>
                <h2 className={classes.bioHeading}>
                  {pageLocale.lodestoneBio}
                </h2>
                <blockquote className={classes.bio}>
                  <span className={`fas fa-quote-left ${classes.bioQuoteIcon}`}/>
                  {bio}
                </blockquote>
              </section>
            )}
            {characterIsVerified
              ? (
                <section className={`${classes.section} ${classes.unverify}`}>
                  <p className={`${classes.help} ${classes.helpUnimportant}`}>
                    {pageLocale.howToUnverifyCharacter}
                  </p>
                  <div className={classes.control}>
                    <button
                      type="button"
                      className={`${classes.button} ${classes.buttonSmall} ${classes.buttonDanger}`}
                      disabled={unverifying}
                      onClick={unverifyCharacter}
                      onKeyDown={(event) => event.which === 13 && unverifyCharacter()}
                    >
                      {unverifying
                        ? (
                          <React.Fragment>
                            <span className="fas fa-cog fa-spin" />
                            {' '}
                            {locale.info.unverifyingCharacter}
                          </React.Fragment>
                        ) : locale.actions.unverifyCharacter
                      }
                    </button>
                  </div>
                </section>
              ) : (
                !user.isLoggedIn || !user.settings.hideVerifyCharacterSection && (
                <VerifyCharacter {...character} />
              ))
            }
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default withRouter(CharacterPage);