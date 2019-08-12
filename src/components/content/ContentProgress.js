import React, { useContext, useEffect, useState } from "react";
import ProgressBar from 'components/content/ProgressBar';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import API from 'js/api';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/ContentProgress';

function ContentProgress({
  source = {}
}) {
  // Context.
  const { name: selectedCharacterName } = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);
  const classes = createUseStyles(style(useContext(ThemeContext)))();

  // State.
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const {
      api: sourceAPI
    } = source;

    (async () => {
      const api = new API();
      const data = await api.json('data');

      if (sourceAPI === 'achievements') {
        setTotal(data[sourceAPI].pointsTotal);
        return;
      }
      
      setTotal(data[sourceAPI].total);
    })();
  }, [])

  const hasProgressBar = window.signedInCharacter || !source.requiresSignIn;

  return (
    <section className={classes.container}>
      <h2 className={classes.heading}>
        {source.title}
      </h2>
      {hasProgressBar && (
        selectedCharacterName
          ? (
            <ProgressBar value={0 /* todo */} limit={total || undefined} />
          ) : (
            <ProgressBar limit={total || undefined} />
          )
      )}
    </section>
  )
}

export default ContentProgress;