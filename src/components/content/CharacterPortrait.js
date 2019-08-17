import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/CharacterPortrait';

const useStyles = createUseStyles(style);

function CharacterPortrait() {
  const classes = useStyles(useContext(ThemeContext));

  // Context.
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);

  if (character.loading) {
    return (
      <figure className={classes.character}>
        <div className={classes.imageWrapper}>
          <span className={classes.image}>
            <span className="fas fa-cog fa-spin" />
          </span>
        </div>
        <figcaption className={`${classes.caption} ${classes.captionCharacterLoading}`}>
          {locale.info.loading}
        </figcaption>
      </figure>
    )
  }

  console.warn(character);

  return (
    <section className={classes.container}>
      {character.name
        ? (
          <React.Fragment>
            <NavLink
              className={classes.link}
              activeClassName={classes.linkActive}
              to={paths.character(character.id)}
            >
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
            </NavLink>
            <Link
              className={`${classes.hyperlink} ${classes.changeCharacter}`}
              to={paths.characterSearch}
            >
              {locale.actions.changeCharacter}
            </Link>
          </React.Fragment>
        ) : (
          <NavLink
            className={classes.link}
            activeClassName={classes.linkActive}
            to={paths.characterSearch}
          >
            <figure className={classes.character}>
              <div className={classes.imageWrapper}>
                <span className={classes.image}>
                  <span className="fal fa-search-plus" />
                </span>
              </div>
              <figcaption className={`${classes.caption} ${classes.captionNoCharacterSelected}`}>
                {locale.actions.selectACharacter}
              </figcaption>
            </figure>
          </NavLink>
        )
      }
    </section>
  )
}

export default CharacterPortrait;