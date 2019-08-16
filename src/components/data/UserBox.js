import React, { useContext, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { CharacterContext } from "contexts/character";
import { ThemeContext } from 'contexts/theme';
import { UserContext } from "contexts/user";
import API from 'js/api';
import Character from 'js/character';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserBox';

const useStyles = createUseStyles(style);

function UserBox() {
  const character = useContext(CharacterContext);
  const user = useContext(UserContext);
  const classes = useStyles({
    ...useContext(ThemeContext),
    componentProps: {
      verifiedCharacters: user.verifiedCharacters
    }
  });

  /**
   * When the `user.loading` state changes, check and fetch the user's verified characters from
   * Firebase, then fetch each character's data from XIVAPI.
   */
  useEffect(() => {
    if (user.loading || !user.isLoggedIn || user.verifiedCharacters) {
      return;
    }

    (async () => {
      const api = new API(undefined, user.data.uid);
      const verifiedCharacters = await api.db('verified');

      const fetchedCharacters = [];

      for (const characterData of verifiedCharacters) {
        console.warn(characterData);

        fetchedCharacters.push({
          ...characterData,
          ...await new Character(characterData).getData()
        });
      }

      user.setVerifiedCharacters(fetchedCharacters);
    })();
  }, [user.loading]);

  if (user.loading) {
    return (
      <div className={classes.wrapper}>
        <div className={`${classes.userBox} ${classes.userBoxLoading}`}>
          <span className={`fas fa-cog fa-spin ${classes.icon}`} />
        </div>
      </div>
    );
  }

  if (!user.data) {
    return (
      <div className={classes.wrapper}>
        <NavLink
          className={`${classes.userBox} ${classes.userBoxAnonymous}`}
          activeClassName={classes.pageActive}
          to={paths.authentication}
        >
          <span className={`fal fa-user-plus ${classes.icon}`} />
        </NavLink>
      </div>
    );
  }

  const { avatar } = user.data;

  return (
    <div className={classes.wrapper}>
      <NavLink
        className={classes.userBox}
        activeClassName={classes.pageActive}
        to={paths.account}
        style={avatar && {
          backgroundImage: `url(${avatar})`
        }}
      >
        {!avatar && (
          <span className={`fas fa-user ${classes.icon}`} />
        )}
      </NavLink>
      <div className={classes.verifiedCharacters}>
        {user.verifiedCharacters && user.verifiedCharacters.map(verifiedCharacter => (
          <NavLink
            key={`user-box-character-${verifiedCharacter.id}`}
            className={classes.verifiedCharacter}
            activeClassName={classes.pageActive}
            to={paths.character(verifiedCharacter.id)}
            style={{
              backgroundImage: `url(${verifiedCharacter.avatar})`
            }}
            title={`${verifiedCharacter.name} (${verifiedCharacter.world})`}
            onClick={() => character.change(verifiedCharacter)}
            onKeyDown={(event) => event.which === 13 && character.change(verifiedCharacter)}
          />
        ))}
      </div>
    </div>
  );
}

export default withRouter(UserBox);