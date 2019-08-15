import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CharacterContext } from "contexts/character";
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import CharacterCard from 'components/content/CharacterCard';
import InlineLoader from 'components/content/InlineLoader';
import Character from 'js/character';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserCharacters';

function UserCharacters({
  characters: charactersDataFromFirebase
}) {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);
  const { userCharacters: componentLocale } = locale.components;
  
  const [loading, setLoading] = useState(!Array.isArray(characters));
  const [characters, setCharacters] = useState();

  useEffect(() => {
    console.info(charactersDataFromFirebase);

    if (!Array.isArray(charactersDataFromFirebase)) {
      setLoading(true);
      return;
    }

    if (!charactersDataFromFirebase.length) {
      setLoading(false);
      return;
    }

    (async () => {
      let fetchedCharacters = [];

      for (const characterData of charactersDataFromFirebase) {
        fetchedCharacters.push(await new Character(characterData).getData());
      }

      setCharacters(fetchedCharacters);
      setLoading(false);
    })();
  }, [charactersDataFromFirebase]);

  if (loading) {
    return <InlineLoader text={(
      <React.Fragment>
        {componentLocale.loading}
        <br />
        <span className={classes.loadingNote}>
          {locale.info.lodestoneDelay}
        </span>
      </React.Fragment>
     )} />;
  }

  if (!charactersDataFromFirebase.length) {
    return (
      <div className={classes.userCharacters}>
        <p className={classes.help}>
          <span class="fal fa-user-slash" />
          {' '}
          {componentLocale.noVerifiedCharacters}
        </p>
      </div>
    )
  }

  return (
    <div className={classes.userCharacters}>
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          {...character}
        />
      ))}
      <p className={classes.help}>
        {componentLocale.verifyMoreCharacters}
      </p>
    </div>
  );
}

export default withRouter(UserCharacters);