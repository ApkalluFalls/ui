import React, { useContext, useEffect, useState } from "react";
import ProgressBar from 'components/content/ProgressBar';
import { LocalisationContext } from 'contexts/localisation';
import API from 'js/api';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/ContentProgress';

function ContentProgress({
  classes,
  source = {}
}) {
  // Context.
  const { locale } = useContext(LocalisationContext);

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

  return (
    <section className={classes.container}>
      <h2 className={classes.heading}>
        {source.title}
      </h2>
      <ProgressBar value={source.fakeProgress} limit={total || undefined} />
    </section>
  )
}

export default injectSheet(style)(ContentProgress);