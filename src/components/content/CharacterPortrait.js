import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { paths } from 'js/routes';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/CharacterPortrait';

function ContentProgress({
  classes
}) {
  // Context.
  const { isCharacterSelected } = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);

  return (
    <section className={classes.container}>
      {isCharacterSelected
        ? undefined /* todo */ : (
          <Link to={paths.characterSelect}>
            <figure className={classes.character}>
              <div className={classes.imageWrapper}>
                <span className={classes.image}>
                  ?
                </span>
              </div>
              <figcaption className={`${classes.caption} ${classes.captionNoCharacterSelected}`}>
                {locale.actions.selectACharacterToTrack}
              </figcaption>
            </figure>
          </Link>
        )
      }
    </section>
  )
}

export default injectSheet(style)(ContentProgress);