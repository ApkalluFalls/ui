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
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);
  const classes = useStyles(useContext(ThemeContext));
  const user = useContext(UserContext);

  // State.
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(1);

  // Map settings to relevant API keys.
  const { contentFilters: filterKeys } = apiKeys;
  const settingsMapping = [{
    apiKey: filterKeys.event,
    settingsKey: 'revealInGameEvents'
  }, {
    apiKey: filterKeys.externalPromo,
    settingsKey: 'revealExternalPromos'
  }, {
    apiKey: filterKeys.legacy,
    settingsKey: 'revealUnusedLegacyContent'
  }, {
    apiKey: filterKeys.realWorldEvent,
    settingsKey: 'revealRealWorldEvents'
  }, {
    apiKey: filterKeys.storePurchase,
    settingsKey: 'revealStorePurchases'
  }]

  useEffect(() => {
    if (!user.settings) {
      return;
    }

    calculateTotalsForContent(settingsMapping);

    if (!character[source.api]) {
      return;
    }

    calculateValuesFromUserData(settingsMapping);
  }, [user.settings])

  useEffect(() => {
    if (!character[source.api]) {
      return;
    }

    calculateValuesFromUserData(settingsMapping);
  }, [character[source.api]])

  /**
   * Parse the data to retrieve the total value offset by the user's settings.
   * @param {Array} settingsMapping - An array of settings mapped to keys.
   */
  function calculateTotalsForContent(settingsMapping) {
    const { settings } = user;
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
  }

  /**
   * Calculate the progress values based on the user's totals.
   * @param {Array} settingsMapping - An array of settings mapped to keys.
   */
  function calculateValuesFromUserData(settingsMapping) {
    let offsetValue = 0;

    // Achievements use the character context.
    if (source.api === 'achievements') {
      const { achievements } = character;
      
      if (!Array.isArray(achievements) || !achievements.length) {
        // If the character has no achievements, return 0.
        offsetValue = 0;
      } else {
        // Iterate over the achievements extracting relevant entries as per the user settings.
        offsetValue = achievements.reduce((points, achievement) => {
          const achievementFilter = achievement[apiKeys.overview.available];

          // If there are no filters on the achievement, increase the points.
          if (!achievementFilter) {
            return points + achievement[apiKeys.lists.points];
          }

          // Compare the user's settings with the achievement's filter properties.
          for (const mapping of settingsMapping) {
            // If the setting is false but the achievement has the filter applied, return 0.
            if (!user.settings[mapping.settingsKey] && achievementFilter[mapping.apiKey]) {
              return points;
            }
          }

          // If it got past the settings mapping check, return the points.
          return points + achievement[apiKeys.lists.points];
        }, 0);
      }
    }

    setValue(offsetValue);
  }

  return (
    <section className={classes.container}>
      <h2 className={classes.heading}>
        {source.title}
      </h2>
      {source.hasVisibleProgressBar && (
        character.name
          ? (
            <ProgressBar value={value} limit={total || undefined} />
          ) : (
            <ProgressBar limit={total || undefined} />
          )
      )}
    </section>
  )
}

export default ContentProgress;