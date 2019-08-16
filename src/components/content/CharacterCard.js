import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/CharacterCard';

const useStyles = createUseStyles(style);

function CharacterCard({
  avatar,
  dc,
  id,
  forename,
  name,
  surname,
  world,
  ...props
}) {
  const classes = useStyles(useContext(ThemeContext));

  // Context.
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);

  /**
   * This function fires whilst navigating to the selected character.
   * Its purpose is to update the active character if `props.setActiveOnClick` is set.
   */
  async function onNavigate() {
    if (!props.setActiveOnClick) {
      return;
    }

    character.change({
      avatar,
      forename,
      id,
      name,
      settingAsActive: true,
      surname,
      world
    });
  }

  return (
    <Link
      key={id}
      onClick={onNavigate}
      onKeyDown={(event) => event.which === 13 && onNavigate()}
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
        {world && (
          <span className={classes.server}>
            {world} ({dc})
          </span>
        )}
      </span>
    </Link>
  )
}

export default CharacterCard;