import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CharacterContext } from "contexts/character";
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import InlineLoader from 'components/content/InlineLoader';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserCharacters';

function UserCharacters({
  characters = []
}) {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);
  const { userCharacters: componentLocale } = locale.components;
  
  const [loading, setLoading] = useState(!Array.isArray(characters) || !characters.length);

  useEffect(() => {
    setLoading(!Array.isArray(characters) || !characters.length);
  }, [characters]);

  if (loading) {
    return <InlineLoader text={componentLocale.loading} />;
  }

  if (characters.length) {
    return (
      <div className={classes.userCharacters}>
        <p className={classes.noneVerified}>
          <span class="fal fa-user-slash" />
          {' '}
          {componentLocale.noVerifiedCharacters}
        </p>
      </div>
    )
  }

  return (
    <div className={classes.userCharacters}>
      Foobar
    </div>
  );
}

export default withRouter(UserCharacters);