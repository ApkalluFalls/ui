import React, { useContext, useEffect, useState } from 'react';
import Icon from 'components/content/Icon';
import Panel from 'components/content/Panel';
import { localeInject, LocalisationContext, localisation } from 'contexts/localisation';
import API from 'js/api';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/data/List';

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
        loaded: true
      });
    })();
  }, []);

  const {
    content,
    iconPositions,
    loaded
  } = data;

  return (
    <section className={classes.list}>
      {loaded ? (
        content.map(([patch, entries]) => {
          return (
            <article className={classes.patchEntries}>
              <Panel heading={`Patch ${patch}`}>
                {entries.map(entry => (
                  <article
                    className={classes.item}
                    key={`list-entry-${entry.id}`}
                  >
                    <span
                      className={classes.icon}
                      title={entry.n}
                    >
                      <Icon id={entry.i} positions={iconPositions} source={source} />
                    </span>
                    <span className={classes.detail}>
                      <h2 className={classes.name}>{entry.n}</h2>
                      {entry.m.length > 0 && (
                        <ol className={classes.methods}>
                          {entry.m.map(([localeKey, icon, details], index) => (
                            <li
                              className={classes.method}
                              key={index}
                            >
                              {localeKey} icon:{icon} {details.join('; ')}
                            </li>
                          ))}
                        </ol>
                      )}
                    </span>
                  </article>
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