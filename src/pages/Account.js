import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { UserContext } from 'contexts/user';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Panel from 'components/content/Panel';
import PatreonSettings from 'components/data/PatreonSettings';
import UserCharacters from 'components/data/UserCharacters';
import Switch from 'components/forms/Switch';
import { paths } from 'js/routes';
import API from 'js/api';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Account';

function Account({
  history
}) {
  // If the user is not signed in, redirect them to the sign in page.
  const user = useContext(UserContext);
  if (!user.loading && !user.type) {
    history.push(paths.authentication);
  }

  const classes = createUseStyles(style(useContext(ThemeContext)))();
  const { locale } = useContext(LocalisationContext);
  const { account: pageLocale } = locale.pages;
  const { whatIsHidden: hiddenContent } = locale.pages.home;
  const {
    manualTracking: manuallyTrackedContent,
    temporaryOrOldContent: temporaryOrOldContent
  } = pageLocale.settings;

  const [verifiedCharacters, setVerifiedCharacters] = useState();

  useEffect(() => {
    if (user.loading) {
      return;
    }

    (async () => {
      const api = new API(undefined, user.data.uid);
      const verifiedCharacters = await api.db('verified');
      setVerifiedCharacters(verifiedCharacters)
    })();
  }, [user.loading])

  /**
   * Log the user out and navigate them back to the home page.
   */
  function handleSignOut() {
    firebase.auth().signOut().then(() => {
      history.push(paths.home);
    }).catch(error => console.warn(error));
  }

  if (user.loading) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p>{pageLocale.about}</p>
      <Panel heading={pageLocale.yourCharacters}>
        <UserCharacters characters={verifiedCharacters} />
      </Panel>
      <Panel heading={(
        <React.Fragment>
          <span className="fab fa-patreon" />
          {' '}
          {locale.common.connectWithPatreon}
        </React.Fragment>
      )}>
        <PatreonSettings inheritedClasses={classes} />
      </Panel>
      <Panel heading={manuallyTrackedContent.heading}>
        <p className={classes.help}>
          {manuallyTrackedContent.help}
        </p>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-minions"
            label={locale.common.minions}
            on={true}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-mounts"
            label={locale.common.mounts}
            on={true}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-emotes"
            label={locale.common.emotes}
            on={true}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-orchestion-rolls"
            label={locale.common.orchestrionRolls}
            on={true}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-barding"
            label={locale.common.barding}
            on={true}
            onChange={(checked) => console.info(checked)}
          />
        </div>
      </Panel>
      <Panel heading={temporaryOrOldContent.heading}>
        <p className={classes.help}>
          {temporaryOrOldContent.help}
        </p>
        <div className={classes.control}>
          <Switch
            id="tracking-events"
            label={hiddenContent.li1}
            on={false}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-feast-seasons"
            label={hiddenContent.li2}
            on={false}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-marketing-festivals"
            label={hiddenContent.li3}
            on={false}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-lodestone-contests"
            label={hiddenContent.li4}
            on={false}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-mog-station"
            label={hiddenContent.li5}
            on={false}
            onChange={(checked) => console.info(checked)}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-disused-legacy"
            label={hiddenContent.li6}
            on={false}
            onChange={(checked) => console.info(checked)}
          />
        </div>
      </Panel>
      <div className={classes.control}>
        <button
          className={classes.button}
          type="button"
          onClick={handleSignOut}
          onKeyDown={(event) => { return event.which === 13 && handleSignOut() }}
        >
          {pageLocale.signOut}
        </button>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Account);