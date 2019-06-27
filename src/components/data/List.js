import React, { useContext, useEffect, useState } from 'react';
import Panel from 'components/content/Panel';
import { localeInject, LocalisationContext, localisation } from 'contexts/localisation';
import API from 'js/api';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/data/List';

// Children.
import ListItem from './List/ListItem';

function List({
  classes,
  source
}) {
  const locale = useContext(LocalisationContext);
  const text = localisation[locale];
  const [data, setData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      const sourceData = await new API(locale).json(source);
      const iconPositions = await new API('icons').json(source);
      const methodIconPositions = await new API('icons').json('methods');

      setData({
        content: Object.entries(sourceData.reduce((obj, entry) => {
          const {
            p: patch
          } = entry;

          if (!obj[patch]) {
            obj[patch] = [];
          }

          obj[patch].push(entry);
          return obj;
        }, {})).reverse(),
        iconPositions,
        loaded: true,
        methodIconPositions
      });
    })();
  }, []);

  const {
    content,
    iconPositions,
    loaded,
    methodIconPositions
  } = data;

  return (
    <section className={classes.list}>
      {loaded ? (
        content.map(([patch, entries]) => {
          return (
            <article className={classes.patchList}>
              <Panel
                className={classes.patchListItem}
                heading={`Patch ${patch}`}
                headingClassName={classes.patchListItemHeading}
              >
                {entries.map(entry => (
                  <ListItem
                    classes={classes}
                    data={entry}
                    iconPositions={iconPositions}
                    methodIconPositions={methodIconPositions}
                    source={source}
                  />
                ))}
              </Panel>
            </article>
          );
        })
      ) : (
        <article>
          <p>{localeInject(text.info.fetchingList, text.common[source])}</p>
        </article>
      )}
    </section>
  );
}

export default injectSheet(style)(List);