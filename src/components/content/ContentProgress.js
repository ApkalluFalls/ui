import React, { useContext, useEffect, useState } from "react";
import ProgressBar from 'components/content/ProgressBar';
import { APIContext } from 'contexts/api';
import { CharacterContext } from 'contexts/character';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import { UserContext } from 'contexts/user';
import API from 'js/api';

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
    let keyTotal = 'total';
    let keyTotalEvents = 'totalEvents';
    let keyTotalLegacy = 'totalLegacy';

    if (source.api === 'achievements') {
      keyTotal = 'pointsTotal';
      keyTotalEvents = 'pointsTotalEvents';
      keyTotalLegacy = 'pointsTotalLegacy';
    }

    let offsetTotal = contentData[apiKeys.overview[keyTotal]];
    
    if (settings.revealInGameEvents) {
      offsetTotal += contentData[apiKeys.overview[keyTotalEvents]] || 0;
    }
    
    if (settings.revealUnusedLegacyContent) {
      offsetTotal += contentData[apiKeys.overview[keyTotalLegacy]] || 0;
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