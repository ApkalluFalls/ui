import React, { useContext, useEffect, useState } from "react";
import ProgressBar from 'components/content/ProgressBar';
import { APIContext } from 'contexts/api';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/ContentProgress';

const useStyles = createUseStyles(style);

function ContentProgress({
  contentData = {},
  source = {}
}) {
  // Context.
  const { keys: apiKeys } = useContext(APIContext);
  const { name: selectedCharacterName } = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);
  const classes = useStyles(useContext(ThemeContext));
  const user = useContext(UserContext);

  // State.
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const { settings } = user;
    if (!settings) {
      return;
    }

    const { overview: overviewKeys } = apiKeys;
    let offsetTotal = 0;

    const available = contentData[overviewKeys.available];
    if (Array.isArray(available)) {
      // If there's an available array, we need to do array comparisons to determine the totals.
      let offsetArray = [...available];

      function getAvailableContentByFilter(filterKey) {
        const content = contentData[filterKey];

        if (!content) {
          return [];
        }

        return content;
      }
      
      if (settings.revealUnknownObtainMethods) {
        offsetArray = [
          ...offsetArray,
          ...getAvailableContentByFilter(overviewKeys.availableUnknown)
        ];
      }
      
      if (settings.revealInGameEvents) {
        offsetArray = [
          ...offsetArray,
          ...getAvailableContentByFilter(overviewKeys.availableEvent)
        ];
      }
      
      if (settings.revealExternalPromos) {
        offsetArray = [
          ...offsetArray,
          ...getAvailableContentByFilter(overviewKeys.availableExternalPromo)
        ];
      }
      
      if (settings.revealUnusedLegacyContent) {
        offsetArray = [
          ...offsetArray,
          ...getAvailableContentByFilter(overviewKeys.availableLegacy)
        ];
      }
      
      if (settings.revealRealWorldEvents) {
        offsetArray = [
          ...offsetArray,
          ...getAvailableContentByFilter(overviewKeys.availableRealWorldEvent)
        ];
      }
      
      if (settings.revealStorePurchases) {
        offsetArray = [
          ...offsetArray,
          ...getAvailableContentByFilter(overviewKeys.availableStorePurchase)
        ];
      }

      offsetTotal = offsetArray.filter((
        (entry, index) => offsetArray.indexOf(entry) === index
      )).length;
    } else {
      // Otherwise we take either the total or pointsTotal and proceed from there.
      let keyTotal = 'total';
      let keyTotalEvents = 'totalEvents';
      let keyTotalLegacy = 'totalLegacy';

      // Achievements rely on achievement points, not totals.
      if (source.api === 'achievements') {
        keyTotal = 'pointsTotal';
        keyTotalEvents = 'pointsTotalEvents';
        keyTotalLegacy = 'pointsTotalLegacy';
      }

      offsetTotal = contentData[overviewKeys[keyTotal]];
      
      if (settings.revealInGameEvents) {
        offsetTotal += contentData[overviewKeys[keyTotalEvents]] || 0;
      }
      
      if (settings.revealUnusedLegacyContent) {
        offsetTotal += contentData[apiKeys.overview[keyTotalLegacy]] || 0;
      }
    }

    setTotal(offsetTotal);
  }, [user.settings])

  return (
    <section className={classes.container}>
      <h2 className={classes.heading}>
        {source.title}
      </h2>
      {source.hasVisibleProgressBar && (
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