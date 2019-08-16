import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import InlineLoader from 'components/content/InlineLoader';
import PageLoader from 'components/content/PageLoader';
import Panel from 'components/content/Panel';

import Character from 'js/character';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Character';

const useStyles = createUseStyles(style);

function CharacterPage({
  match,
  ...rest
}) {
  const classes = useStyles(useContext(ThemeContext));
  console.warn(useContext(CharacterContext));
  const { locale } = useContext(LocalisationContext);
  const { character: pageLocale } = locale.pages;

  const { characterId } = match.params;

  const [character, setCharacter] = useState();

  useEffect(() => {
    const character = new Character({
      id: characterId
    });

    (async () => {
      const data = await character.getData();
      setCharacter(data);

      const achievements = await character.getAchievements();
      console.info(achievements);
    })();
  }, [characterId]);

  if (!character) {
    return (
      <PageLoader text={pageLocale.communicatingWithXIVAPI} />
    );
  }

  const {
    bio,
    dc: dataCenter,
    freeCompany,
    name,
    world
  } = character;

  return (
    <React.Fragment>
      <h1 className={classes.name}>
        {character.name}
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
      {}
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
    </React.Fragment>
  )
}

export default withRouter(CharacterPage);