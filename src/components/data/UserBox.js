import React, { useContext, useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { CharacterContext } from "contexts/character";
import { LocalisationContext } from "contexts/localisation";
import { ThemeContext } from 'contexts/theme';
import { UserContext } from "contexts/user";
import API from 'js/api';
import Character from 'js/character';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/data/UserBox';

const useStyles = createUseStyles(style);

function UserBox() {
  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);
  const user = useContext(UserContext);
  const classes = useStyles({
    ...useContext(ThemeContext),
    componentProps: {
      verifiedCharacters: user.verifiedCharacters
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  /**
   * When the `user.loading` state changes, check and fetch the user's verified characters from
   * Firebase, then fetch each character's data from XIVAPI.
   */
  useEffect(() => {
    if (user.loading || !user.isLoggedIn || user.verifiedCharacters) {
      return;
    }

    (async () => {
      const api = new API(undefined, user.data.uid);
      const verifiedCharacters = await api.db('verified');

      const fetchedCharacters = [];

      for (const characterData of verifiedCharacters) {
        fetchedCharacters.push({
          ...characterData,
          ...await new Character(characterData).getData()
        });
      }

      user.setVerifiedCharacters(fetchedCharacters);
    })();
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (user.loading) {
      return;
    }

    const userUnsavedChanges = user.unsavedChanges[user.data.uid];

    if (!userUnsavedChanges && typeof userUnsavedChanges !== 'object') {
      setHasUnsavedChanges(false);
      return;
    }

    setHasUnsavedChanges(!!Object.keys(userUnsavedChanges).length);
  }, [user.loading, user.unsavedChanges])

  if (user.loading) {
    return (
      <div className={classes.wrapper}>
        <div className={`${classes.userBox} ${classes.userBoxLoading}`}>
          <span className={`fas fa-cog fa-spin ${classes.icon}`} />
        </div>
      </div>
    );
  }

  if (!user.data) {
    return (
      <div className={classes.wrapper}>
        <NavLink
          className={`${classes.userBox} ${classes.userBoxAnonymous}`}
          activeClassName={classes.pageActive}
          to={paths.authentication}
        >
          <span className={`fal fa-user-plus ${classes.icon}`} />
        </NavLink>
      </div>
    );
  }

  /**
   * Send any unsaved changes over to the database.
   */
  async function handleSaveChanges() {
    if (saving) {
      return;
    }

    setSaving(true);
    const userUnsavedChanges = user.unsavedChanges[user.data.uid];

    const {
      barding = [],
      emotes = [],
      minions = [],
      mounts = [],
      'orchestrion-rolls': orchestrion = []
    } = await new API(undefined, user.data.uid).db();

    const response = {
      barding,
      emotes,
      minions,
      mounts,
      'orchestrion-rolls': orchestrion
    };

    let shouldSyncCharacter = false;

    Object.entries(userUnsavedChanges).forEach(([characterId, content = {}]) => {
      if (character.id === Number(characterId)) {
        shouldSyncCharacter = true;
      }

      Object.entries(content).forEach(([source, data = {}]) => {
        const sourceKey = source === 'orchestrion' ? 'orchestrion-rolls' : source;
        
        Object.entries(data).forEach(([contentId, isObtained]) => {
          const match = response[sourceKey].find((
            entry => entry.character === Number(characterId) && entry.id === Number(contentId)
          ));

          if (match) {
            match.obtained = isObtained;
            return;
          }

          response[sourceKey].push({
            character: Number(characterId),
            id: Number(contentId),
            obtained: isObtained
          });
        })
      });
    });

    await new API(undefined, user.data.uid).db(undefined, response, true, true);

    if (shouldSyncCharacter) {
      await character.onSync(character, character.data.achievements, character.data.titles);
    }

    const unsavedChanges = { ...user.UnsavedChanges };
    delete unsavedChanges[user.data.uid];
    user.setUnsavedChanges(unsavedChanges);

    setSaving(false);
  }

  const { avatar } = user.data;

  return (
    <div className={classes.wrapper}>
      <NavLink
        className={`${classes.userBox} ${hasUnsavedChanges ? classes.userBoxUnsavedChanges : ''}`}
        activeClassName={classes.pageActive}
        to={paths.account}
        style={avatar && {
          backgroundImage: `url(${avatar})`
        }}
      >
        {!avatar && (
          <span className={`fas fa-user ${classes.icon}`} />
        )}
      </NavLink>
      <div className={classes.verifiedCharacters}>
        {user.verifiedCharacters && user.verifiedCharacters.map(verifiedCharacter => (
          <NavLink
            key={`user-box-character-${verifiedCharacter.id}`}
            className={classes.verifiedCharacter}
            activeClassName={classes.pageActive}
            to={paths.character(verifiedCharacter.id)}
            style={{
              backgroundImage: `url(${verifiedCharacter.avatar})`
            }}
            title={`${verifiedCharacter.name} (${verifiedCharacter.world})`}
            onClick={() => character.change(verifiedCharacter)}
            onKeyDown={(event) => event.which === 13 && character.change(verifiedCharacter)}
          />
        ))}
      </div>
      <div className={`${classes.unsavedChanges} ${hasUnsavedChanges ? '' : classes.unsavedChangesCollapsed} ${saving ? classes.savingChanges : ''}`}>
        {hasUnsavedChanges && (
          <span
            className={classes.unsavedChangesButton}
            role="button"
            tabIndex="0"
            onClick={handleSaveChanges}
            onKeyDown={(event) => event.which === 13 && handleSaveChanges()}
          >
            <span className={`fal fa-${saving ? 'cog fa-spin' : 'save'}`} />
            <span className={classes.unsavedChangesText}>
              {saving
                ? locale.info.savingChanges
                : locale.actions.saveChanges
              }
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default withRouter(UserBox);