import React, { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CharacterContext } from "contexts/character";
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserBox';

function UserBox() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const character = useContext(CharacterContext);

  console.warn(character);

  if (character.loading) {
    return (
      <div className={classes.userBox}>
        <span className={classes.avatar}>
          <span class={`fas fa-cog fa-spin ${classes.icon}`} />
        </span>
      </div>
    );
  }

  if (!character.data) {
    return (
      <Link
        className={`${classes.userBox} ${classes.userBoxAnonymous}`}
        to={paths.authentication}
      >
        <span class={`fal fa-user-plus ${classes.icon}`} />
      </Link>
    );
  }

  const { avatar } = character.data;

  return (
    <div className={classes.userBox}>
      <React.Fragment>
        <span
          className={classes.avatar}
          style={avatar && {
            backgroundImage: `url(${avatar})`
          }}
        >
          {!avatar && (
            <span class={`fas fa-user ${classes.icon}`} />
          )}
        </span>
      </React.Fragment>
    </div>
  );
}

export default withRouter(UserBox);