import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/CharacterPortrait';

function ContentProgress() {
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
              to={paths.characterSelect}
            >
              {locale.actions.changeCharacter}
            </Link>
          </React.Fragment>
        ) : (
          <Link to={paths.characterSelect}>
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

export default ContentProgress;