import React, { useContext, useEffect, useState } from 'react';
import PageLoader from 'components/content/PageLoader';
import Panel from 'components/content/Panel';
import { APIContext } from 'contexts/api';
import { UserContext } from 'contexts/user';
import { localeInject, LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import API from 'js/api';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/List';
import panelStyle from 'styles/content/Panel';

// Children.
import ListItem from './List/ListItem';

const usePanelStyles = createUseStyles(panelStyle);
const useStyles = createUseStyles(style);

function List({
  source
}) {
  const { overview: apiOverview } = useContext(APIContext);
  const { keys } = apiOverview;
  const theme = useContext(ThemeContext);
  const panelClasses = usePanelStyles(theme);
  const classes = useStyles(theme);
  const user = useContext(UserContext);

  // Contexts.
  const {
    language,
    locale
  } = useContext(LocalisationContext);

  // State.
  const [data, setData] = useState({ loaded: false });

  useEffect(() => {
    (async () => {
      const apiListKeys = keys.lists;
      const apiMethodKeys = keys.contentFilters;

      // Grab the data and apply filters from the user's settings.
      const sourceData = (await new API(language).json(source)).map(entry => {
        const { methods: methodsKey } = apiListKeys;

        const response = {
          ...entry,
          originalMethods: entry[methodsKey]
        };

        // Filter the methods based on the user's settings.
        response[methodsKey] = entry[methodsKey].filter(method => {
          // If there are no special filters associated with the method, let it through.
          if (method.length === 3) {
            return true;
          }

          const filters = method[3];

          const {
            revealExternalPromos,
            revealInGameEvents,
            revealRealWorldEvents,
            revealStorePurchases,
            revealUnusedLegacyContent
          } = user.settings;

          // Events.
          if (!revealInGameEvents && filters[apiMethodKeys.event]) {
            return false;
          }

          // Legacy.
          if (!revealUnusedLegacyContent && filters[apiMethodKeys.legacy]) {
            return false;
          }

          // Promos.
          if (!revealExternalPromos && filters[apiMethodKeys.externalPromo]) {
            return false;
          }

          // Real world events.
          if (!revealRealWorldEvents && filters[apiMethodKeys.realWorldEvent]) {
            return false;
          }

          // Store purchases.
          if (!revealStorePurchases && filters[apiMethodKeys.storePurchase]) {
            return false;
          }

          return true;
        });

        return response;
      }).filter(entry => {
        // Filter out missing methods if necessary.
        const {
          revealUnknownObtainMethods
        } = user.settings;

        if (revealUnknownObtainMethods && !entry.originalMethods.length) {
          return true;
        }

        return entry[apiListKeys.methods].length;
      })

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
  }, [keys]);

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
            <article
              key={`list-content-${patch}`}
              className={classes.patchList}
            >
              <Panel
                classesOverride={panelClasses}
                className={classes.patchListItem}
                heading={`Patch ${patch}`}
                headingClassName={classes.patchListItemHeading}
              >
                {entries.map(entry => (
                  <ListItem
                    key={`list-content-item-${entry.id}`}
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
          <PageLoader text={localeInject(locale.info.fetchingList, locale.common[source])} />
        </article>
      )}
    </section>
  );
}

export default List;