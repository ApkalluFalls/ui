import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import Panel from 'components/content/Panel';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/CharacterSearch';

function CharacterSearch() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);
  const { characterSearch: pageLocale } = locale.pages;
  const user = useContext(UserContext);

  console.warn(user);

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p>{pageLocale.about}</p>
      {!user.loading && !user.type && (
        <p>
          <span class="fal fa-user-plus" />
          {' '}
          {pageLocale.signedOutNotice}
        </p>
      )}
      <Panel>
      </Panel>
    </React.Fragment>
  )
}

export default CharacterSearch;