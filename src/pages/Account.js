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

const useStyles = createUseStyles(style);

function Account({
  history
}) {
  console.warn('Todo: The Feast content filtering.');

  // If the user is not signed in, redirect them to the sign in page.
  const user = useContext(UserContext);
  if (!user.loading && !user.isLoggedIn) {
    history.push(paths.authentication);
  }

  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { account: pageLocale } = locale.pages;
  const { whatIsHidden: hiddenContent } = locale.pages.home;
  const {
    expansions: expansionSettings,
    lookAndFeel: lookAndFeelSettings,
    manualTracking: manuallyTrackedContent,
    temporaryOrOldContent: temporaryOrOldContent
  } = pageLocale.settings;

  /**
   * Log the user out and navigate them back to the home page.
   */
  function handleSignOut() {
    firebase.auth().signOut().then(() => {
      history.push(paths.home);
    }).catch(error => console.warn(error));
  }

  if (user.loading || !user.isLoggedIn) {
    return <React.Fragment />;
  }

  const { settings: userSettings } = user;

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p>{pageLocale.about}</p>
      <Panel heading={pageLocale.yourCharacters}>
        <UserCharacters />
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
      <Panel heading={(
        <React.Fragment>
          <span className="fab fa-patreon" />
          {' '}
          {locale.common.connectWithPatreon}
        </React.Fragment>
      )}>
        <PatreonSettings inheritedClasses={classes} />
      </Panel>
      <Panel heading={lookAndFeelSettings.heading}>
        <p className={classes.help}>
          {lookAndFeelSettings.help}
        </p>
        <div className={classes.control}>
          <Switch
            id="look-and-feel-dark-mode"
            label={locale.labels.darkMode}
            on={userSettings.theme === 'dark'}
            onChange={(checked) => user.modifySettings({
              theme: checked ? 'dark' : 'light'
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="look-and-feel-verify-characters"
            label={locale.labels.hideVerifyCharacterSection}
            on={userSettings.hideVerifyCharacterSection}
            onChange={(checked) => user.modifySettings({
              hideVerifyCharacterSection: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="look-and-feel-unknown-methods"
            label={locale.labels.showUnknownMethods}
            on={userSettings.revealUnknownObtainMethods}
            onChange={(checked) => user.modifySettings({
              revealUnknownObtainMethods: checked
            })}
          />
        </div>
      </Panel>
      <Panel heading={manuallyTrackedContent.heading}>
        <p className={classes.help}>
          {manuallyTrackedContent.help}
        </p>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-minions"
            label={locale.common.minions}
            on={userSettings.enableManualTrackingMinions}
            onChange={(checked) => user.modifySettings({
              enableManualTrackingMinions: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-mounts"
            label={locale.common.mounts}
            on={userSettings.enableManualTrackingMounts}
            onChange={(checked) => user.modifySettings({
              enableManualTrackingMounts: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-emotes"
            label={locale.common.emotes}
            on={userSettings.enableManualTrackingEmotes}
            onChange={(checked) => user.modifySettings({
              enableManualTrackingEmotes: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-orchestion-rolls"
            label={locale.common.orchestrionRolls}
            on={userSettings.enableManualTrackingOrchestrion}
            onChange={(checked) => user.modifySettings({
              enableManualTrackingOrchestrion: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="manual-tracking-barding"
            label={locale.common.barding}
            on={userSettings.enableManualTrackingBarding}
            onChange={(checked) => user.modifySettings({
              enableManualTrackingBarding: checked
            })}
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
            on={userSettings.revealInGameEvents}
            onChange={(checked) => user.modifySettings({
              revealInGameEvents: checked
            })}
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
            on={userSettings.revealRealWorldEvents}
            onChange={(checked) => user.modifySettings({
              revealRealWorldEvents: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-external-promos"
            label={hiddenContent.li4}
            on={userSettings.revealExternalPromos}
            onChange={(checked) => user.modifySettings({
              revealExternalPromos: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-mog-station"
            label={hiddenContent.li5}
            on={userSettings.revealStorePurchases}
            onChange={(checked) => user.modifySettings({
              revealStorePurchases: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="tracking-unsused-legacy"
            label={hiddenContent.li6}
            on={userSettings.revealUnusedLegacyContent}
            onChange={(checked) => user.modifySettings({
              revealUnusedLegacyContent: checked
            })}
          />
        </div>
      </Panel>
      <Panel heading={expansionSettings.heading}>
        <p className={classes.help}>
          {expansionSettings.help}
        </p>
        <div className={classes.control}>
          <Switch
            id="expansion-arr"
            label={locale.expansions.aRealmReborn}
            on={userSettings.expansionARealmReborn}
            onChange={(checked) => user.modifySettings({
              expansionARealmReborn: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="expansion-hw"
            label={locale.expansions.heavensward}
            on={userSettings.expansionHeavensward}
            onChange={(checked) => user.modifySettings({
              expansionHeavensward: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="expansion-sb"
            label={locale.expansions.stormblood}
            on={userSettings.expansionStormblood}
            onChange={(checked) => user.modifySettings({
              expansionStormblood: checked
            })}
          />
        </div>
        <div className={classes.control}>
          <Switch
            id="expansion-shb"
            label={locale.expansions.shadowbringers}
            on={userSettings.expansionShadowbringers}
            onChange={(checked) => user.modifySettings({
              expansionShadowbringers: checked
            })}
          />
        </div>
      </Panel>
    </React.Fragment>
  )
}

export default withRouter(Account);