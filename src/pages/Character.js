import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { APIContext } from 'contexts/api';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import FreeCompanyName from 'components/content/FreeCompanyName';
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
  const { overview: apiOverview } = useContext(APIContext);
  const { keys: apiKeys } = apiOverview;
  const { lists: apiListKeys } = apiKeys;
  const characterFromContext = useContext(CharacterContext);
  const user = useContext(UserContext);
  const classes = useStyles(useContext(ThemeContext));
  const { language, locale } = useContext(LocalisationContext);
  const { character: pageLocale } = locale.pages;

  const { characterId } = match.params;

  const [character, setCharacter] = useState();
  const [achievements, setAchievements] = useState();
  const [synchronising, setSynchronising] = useState(false);
  const [unverifying, setUnverifying] = useState(false);

  /**
   * When a character is selected, fetch their data and update the character context.
   */
  useEffect(() => {
    syncCharacterData(false);
  }, [characterId]);

  /**
   * Synchronise character data with the Lodestone via XIVAPI.
   * This will fetch character data and information about their achievements and update the
   * character context accordingly.
   * @param {Boolean} [bypassCache] - A flag to determine whether we should ignore any cached data.
   */
  function syncCharacterData(bypassCache) {
    setSynchronising(true);
    
    const character = new Character({
      id: Number(characterId)
    });

    (async () => {
      const data = await character.getData(bypassCache);
      setCharacter(data);
  
      const achievements = await character.getAchievements(bypassCache);

      if (achievements.isPrivate) {
        setAchievements(achievements);
        setSynchronising(false);
        return;
      }

      // Fetch the achievements data from the API to merge with the character's achievements.
      const achievementsFromApi = await new API(language).json('achievements');

      const characterTitles = [];
      const characterAchievements = achievements.list.map(entry => {
        const achievementFromApi = achievementsFromApi.find((
          achievement => achievement[apiListKeys.id] === entry.id
        ));

        const title = achievementFromApi[apiListKeys.title];
        if (title) {
          characterTitles.push(title.id);
        }

        return {
          ...achievementFromApi,
          unlocked: entry.date
        }
      });

      setAchievements(characterAchievements);

      // If this is the active character, update the context.
      if (Number(characterId) === characterFromContext.id) {
        characterFromContext.onSync(data, characterAchievements, characterTitles);
      }

      setSynchronising(false);
    })();
  }

  /**
   * Parse the error response from XIVAPI and generate the message to be displayed to the user.
   */
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
      <PageLoader text={locale.info.communicatingWithXIVAPI} />
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
          </h1>
          {freeCompany && (
            <p className={classes.tagline}>
              <FreeCompanyName {...freeCompany} />
            </p>
          )}
          <p className={`${classes.tagline} ${classes.taglineSmall}`}>
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
            <section className={`${classes.section} ${classes.sectionSeparate}`}>
              <p className={`${classes.help} ${classes.helpUnimportant}`}>
                {pageLocale.howToSyncCharacterData}
              </p>
              <div className={classes.control}>
                <button
                  type="button"
                  className={`${classes.button} ${classes.buttonSmall}`}
                  disabled={synchronising}
                  onClick={() => syncCharacterData(true)}
                  onKeyDown={(event) => event.which === 13 && syncCharacterData(true)}
                >
                  {synchronising
                    ? (
                      <React.Fragment>
                        <span className="fal fa-sync fa-spin" />
                        {' '}
                        {locale.info.synchronising}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <span className="fal fa-sync" />
                        {' '}
                        {locale.actions.syncCharacterData}
                      </React.Fragment>
                    )
                  }
                </button>
              </div>
            </section>
            {characterIsVerified
              ? (
                <section className={`${classes.section} ${classes.sectionSeparate}`}>
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
                        ) : (
                          <React.Fragment>
                            <span className="fal fa-user-minus" />
                            {' '}
                            {locale.actions.unverifyOwnership}
                          </React.Fragment>
                        )
                      }
                    </button>
                  </div>
                </section>
              ) : (
                !user.isLoggedIn || !user.settings.hideVerifyCharacterSection && (
                  <section className={`${classes.section} ${classes.sectionSeparate}`}>
                    <VerifyCharacter {...character} />
                  </section>
                )
              )
            }
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default withRouter(CharacterPage);