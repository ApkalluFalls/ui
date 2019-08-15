import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/CharacterPortrait';

function CharacterPortrait() {
  const classes = createUseStyles(style(useContext(ThemeContext)))();

  // Context.
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);

  return (
    <section className={classes.container}>
      {character.name
        ? (
          <React.Fragment>
            <Link to={paths.character(character.id)}>
              <figure className={classes.character}>
                <div className={classes.imageWrapper}>
                  <span
                    className={classes.image}
                    style={{
                      backgroundImage: `url(${character.avatar})`
                    }}
                  />
                </div>
                <figcaption className={classes.caption}>
                  {character.forename}
                  <br />
                  {character.surname}
                </figcaption>
              </figure>
            </Link>
            <Link
              className={classes.changeCharacter}
              to={paths.characterSearch}
            >
              {locale.actions.changeCharacter}
            </Link>
          </React.Fragment>
        ) : (
          <Link to={paths.characterSearch}>
            <figure className={classes.character}>
              <div className={classes.imageWrapper}>
                <span className={classes.image}>
                  ?
                </span>
              </div>
              <figcaption className={`${classes.caption} ${classes.captionNoCharacterSelected}`}>
                {locale.actions.selectACharacter}
              </figcaption>
            </figure>
          </Link>
        )
      }
    </section>
  )
}

export default CharacterPortrait;