import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CharacterContext } from "contexts/character";
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import CharacterCard from 'components/content/CharacterCard';
import InlineLoader from 'components/content/InlineLoader';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserCharacters';

const useStyles = createUseStyles(style);

function UserCharacters() {
  const classes = useStyles(useContext(ThemeContext));
  const user = useContext(UserContext);
  const { locale } = useContext(LocalisationContext);
  const { userCharacters: componentLocale } = locale.components;

  const {
    verifiedCharacters
  } = user;

  if (!verifiedCharacters) {
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

  if (!verifiedCharacters.length) {
    return (
      <div className={classes.userCharacters}>
        <p className={classes.help}>
          <span className="fal fa-user-slash" />
          {' '}
          {componentLocale.noVerifiedCharacters}
        </p>
      </div>
    )
  }

  return (
    <div className={classes.userCharacters}>
      {verifiedCharacters.map(character => (
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