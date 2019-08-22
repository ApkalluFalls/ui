import React, { useContext, useEffect, useState } from "react";
import ProgressBar from 'components/content/ProgressBar';
import { APIContext } from 'contexts/api';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/ContentProgress';

const useStyles = createUseStyles(style);

function ContentProgress({
  characterSourceData = [],
  contentData = {},
  source = {}
}) {
  // Context.
  const { overview: apiOverview } = useContext(APIContext);
  const { keys: apiKeys } = apiOverview;
  const classes = useStyles(useContext(ThemeContext));
  const user = useContext(UserContext);

  // State.
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(1);

  // Map settings to relevant API keys.
  const {
    contentFilters: filterKeys,
    overview: overviewKeys
  } = apiKeys;

  const settingsMapping = [{
    filterKey: filterKeys.event,
    overviewKey: overviewKeys.availableEvent,
    settingsKey: 'revealInGameEvents'
  }, {
    filterKey: filterKeys.externalPromo,
    overviewKey: overviewKeys.availableExternalPromo,
    settingsKey: 'revealExternalPromos'
  }, {
    filterKey: filterKeys.legacy,
    overviewKey: overviewKeys.availableLegacy,
    settingsKey: 'revealUnusedLegacyContent'
  }, {
    filterKey: filterKeys.realWorldEvent,
    overviewKey: overviewKeys.availableRealWorldEvent,
    settingsKey: 'revealRealWorldEvents'
  }, {
    filterKey: filterKeys.storePurchase,
    overviewKey: overviewKeys.availableStorePurchase,
    settingsKey: 'revealStorePurchases'
  }];

  useEffect(() => {
    if (!user.settings) {
      return;
    }

    calculateTotalsForContent();

    if (!characterSourceData) {
      return;
    }

    calculateValuesFromUserData();
  }, [user.settings])

  useEffect(() => {
    if (!characterSourceData) {
      return;
    }

    calculateValuesFromUserData();
  }, [characterSourceData])

  /**
   * Parse the data to retrieve the total value offset by the user's settings.
   */
  function calculateTotalsForContent() {
    const { settings } = user;
    const { overview: overviewKeys } = apiKeys;
    let offsetTotal = 0;
  
    if (source.api === 'achievements') {  
      offsetTotal = contentData[overviewKeys.pointsTotal];
      
      if (settings.revealInGameEvents) {
        offsetTotal += contentData[overviewKeys.pointsTotalEvents] || 0;
      }
      
      if (settings.revealUnusedLegacyContent) {
        offsetTotal += contentData[apiKeys.overview.pointsTotalLegacy] || 0;
      }
    } else if (source.api !== 'orchestrion') { /** TODO: Implement orchestrion overview data */
      offsetTotal = getTotalsFromSettingsMapping();
    }
  
    setTotal(offsetTotal);
  }

  /**
   * Calculate the progress values based on the user's totals.
   */
  function calculateValuesFromUserData() {
    let offsetValue = 0;

    // Achievements use the character context.
    if (source.api === 'achievements') {      
      if (!Array.isArray(characterSourceData) || !characterSourceData.length) {
        // If the character has no achievements, return 0.
        offsetValue = 0;
      } else {
        // Iterate over the achievements extracting relevant entries as per the user settings.
        offsetValue = characterSourceData.reduce((points, achievement) => {
          const achievementFilter = achievement[apiKeys.overview.available];

          // If there are no filters on the achievement, increase the points.
          if (!achievementFilter) {
            return points + achievement[apiKeys.lists.points];
          }

          // Compare the user's settings with the achievement's filter properties.
          for (const mapping of settingsMapping) {
            // If the setting is false but the achievement has the filter applied, return 0.
            if (!user.settings[mapping.settingsKey] && achievementFilter[mapping.filterKey]) {
              return points;
            }
          }

          // If it got past the settings mapping check, return the points.
          return points + achievement[apiKeys.lists.points];
        }, 0);
      }
    } else if (source.api !== 'orchestrion') { /** TODO: Implement orchestrion overview data */
      // Everything else uses the same format.
      offsetValue = getTotalsFromSettingsMapping(true)
    }

    setValue(offsetValue);
  }

  /**
   * Determine the total value from the settings mapping.
   * @param {Boolean} [isOffsetByCharacterSourceData] - Boolean to determine if we're using the character source data to determine the values.
   */
  function getTotalsFromSettingsMapping(isOffsetByCharacterSourceData = false) {
    const unknown = (
      user.settings.revealUnknownObtainMethods && contentData[overviewKeys.availableUnknown]
    );

    let masterArray = [
      ...contentData[overviewKeys.available],
      ...(unknown || [])
    ];

    // Compare the user's settings with the content's filter properties.
    for (const mapping of settingsMapping) {
      const data = contentData[mapping.overviewKey];
      // If the setting is false but the content has the filter applied, extend the master array.
      if (data && user.settings[mapping.settingsKey]) {
        masterArray = [
          ...masterArray,
          ...data
        ]
      }
    }

    if (isOffsetByCharacterSourceData) {
      return characterSourceData.filter(entry => masterArray.indexOf(entry) !== -1).length;
    }

    return masterArray.filter((entry, index) => masterArray.indexOf(entry) === index).length;
  }

  return (
    <section className={classes.container}>
      <h2 className={classes.heading}>
        {source.title}
      </h2>
      {source.hasVisibleProgressBar && (
        characterSourceData.length
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