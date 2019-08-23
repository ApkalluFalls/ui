import React, { useContext, useEffect, useState } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import ContentProgress from 'components/content/ContentProgress';
import InlineLoader from 'components/content/InlineLoader';
import API from 'js/api';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/CharacterStats';

const useStyles = createUseStyles(style);

function CharacterStats({ achievements }) {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { characterStats: componentLocale } = locale.components;

  if (achievements.isPrivate) {
    return (
      <React.Fragment>
        <p className={classes.helpHeading}>
          <span className="fal fa-lock-alt" />
          {' '}
          {componentLocale.achievementsPrivate}
        </p>
        <p className={classes.help}>
          {componentLocale.howToMakeAchievementsPublic}
        </p>
        <ol className={classes.list}>
          <li className={classes.listItem}>
            {locale.common.lodestoneSignIn}
            <br />
            <a
              href={locale.links.lodestone}
              className={classes.hyperlink}
              target="__blank"
            >
              {locale.links.lodestone}
            </a>
          </li>
          <li className={classes.listItem}>
            {componentLocale.lodestoneAccountManagement}
            <br />
            <a
              href={locale.links.lodestoneAccountManagement}
              className={classes.hyperlink}
              target="__blank"
            >
              {locale.links.lodestoneAccountManagement}
            </a>
          </li>
          <li className={classes.listItem}>
            {componentLocale.lodestoneAchievementsPublic}
          </li>
          <li className={classes.listItem}>
            {componentLocale.howToRefreshData}
          </li>
        </ol>
      </React.Fragment>
    )
  }

  const [contentData, setContentData] = useState();

  useEffect(() => {
    (async () => {
      const contentData = await new API().json('data');
      setContentData(contentData);
    })();
  }, []);

  if (!contentData) {
    return (
      <InlineLoader text={locale.info.loading} />
    )
  }

  return (
    <React.Fragment>
      <ContentProgress
        characterSourceData={achievements}
        contentData={contentData.achievements}
        source={{
          api: 'achievements',
          hasVisibleProgressBar: true,
          path: paths.achievements,
          title: locale.common.achievements
        }}
      />
    </React.Fragment>
  );
}

export default CharacterStats;