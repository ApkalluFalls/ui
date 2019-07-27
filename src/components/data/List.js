import React, { useContext, useEffect, useState } from 'react';
import PageLoader from 'components/content/PageLoader';
import Panel from 'components/content/Panel';
import { localeInject, LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import API from 'js/api';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/List';
import panelStyle from 'styles/content/Panel';

// Children.
import ListItem from './List/ListItem';

function List({
  source
}) {
  const theme = useContext(ThemeContext);
  const panelClasses = createUseStyles(panelStyle(theme))();
  const classes = createUseStyles(style(theme))();

  // Contexts.
  const {
    language,
    locale
  } = useContext(LocalisationContext);

  // State.
  const [data, setData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      const sourceData = await new API(language).json(source);
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
                classesOverride={panelClasses}
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
        <article className={classes.patchList}>
          <PageLoader>
            {localeInject(locale.info.fetchingList, locale.common[source])}
          </PageLoader>
        </article>
      )}
    </section>
  );
}

export default List;