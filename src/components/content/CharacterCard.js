import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/CharacterCard';

function CharacterCard({
  avatar,
  dc,
  id,
  name,
  world,
  ...rest
}) {
  const classes = createUseStyles(style(useContext(ThemeContext)))();

  // Context.
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);

  console.info(rest);

  return (
    <Link
      key={id}
      to={paths.character(id)}
      className={classes.characterCard}
    >
      <span
        className={classes.avatar}
        style={{
          backgroundImage: `url(${avatar})`
        }}
      />
      <span className={classes.text}>
        <span className={classes.name}>
          {name}
        </span>
        <span className={classes.server}>
          {world} ({dc})
        </span>
      </span>
    </Link>
  )
}

export default CharacterCard;