import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { APIContext } from 'contexts/api';
import { CharacterContext } from 'contexts/character';
import { localeInject, LocalisationContext } from 'contexts/localisation';
import { UserContext } from 'contexts/user';
import Icon from 'components/content/Icon';
import Checkbox from 'components/forms/Checkbox';
import { paths } from 'js/routes';

function ListItem({
  classes,
  data,
  iconPositions,
  methodIconPositions,
  history,
  source
}) {
  // Contexts.
  const {
    overview: apiOverview,
  } = useContext(APIContext);
  const {
    lists: listsKeys,
    overview: overviewKeys
  } = apiOverview.keys;

  const character = useContext(CharacterContext);
  const { locale } = useContext(LocalisationContext);
  const user = useContext(UserContext);

  const hasKnownMethods = (
    Array.isArray(data[listsKeys.methods])
    && data[listsKeys.methods].length > 0
  );

  const hasRoundedIcon = source === 'orchestrion';

  const unlockedByDefault = (
    apiOverview[source][overviewKeys.unlockedByDefault] || []
  ).indexOf(data[listsKeys.id]) !== -1;

  const characterSourceData = (
    character
    && character.data
    && character.data[source]
  ) || [];

  const getUnsavedChanges = () => {
    return (
      character
      && user
      && user.isLoggedIn
      && user.data
      && user.unsavedChanges
      && user.unsavedChanges[user.data.uid]
      && user.unsavedChanges[user.data.uid][character.id]
      && user.unsavedChanges[user.data.uid][character.id][source]
    ) || {};
  }

  const unsavedChanges = getUnsavedChanges();

  const [obtained, setObtained] = useState((
    unlockedByDefault
    || (
      unsavedChanges[data[listsKeys.id]] !== undefined
      ? unsavedChanges[data[listsKeys.id]]
      : characterSourceData.indexOf(data[listsKeys.id]) !== -1
    )
  ));
  const [unsaved, setUnsaved] = useState(unsavedChanges[data[listsKeys.id]] !== undefined);

  useEffect(() => {
    const unsavedChanges = getUnsavedChanges();
    if (unsavedChanges[data[listsKeys.id]] !== undefined) {
      return;
    }

    setObtained(unlockedByDefault || characterSourceData.indexOf(data[listsKeys.id]) !== -1);
    setUnsaved(false);
  }, [user.unsavedChanges]);

  function handleObtainedChange(checked) {
    if (!character) {
      if (confirm(locale.info.selectCharacterBeforeMarkingComplete)) {
        history.push(paths.characterSearch);
      }
      return;
    }

    if (!user || !user.isLoggedIn) {
      if (confirm(locale.info.signInBeforeMarkingComplete)) {
        history.push(paths.authentication);
      }
      return;
    }

    if ((
      !Array.isArray(user.verifiedCharacters)
      || !user.verifiedCharacters.find(c => c.id === character.id)
    )) {
      if (confirm(locale.info.verifyCharacterBeforeMakingComplete)) {
        history.push(paths.character(character.id));
      }
      return;
    }

    setObtained(unlockedByDefault || checked);
    user.modifyUnsavedChanges(source, data, checked);
    setUnsaved(!unsaved);
  }

  return (
    <VisibilitySensor
      intervalCheck={true}
      partialVisibility={true}
    >
      {({isVisible}) => {
        if (!isVisible) {
          return (
            <article
              className={classes.item}
              key={`list-data-${data[listsKeys.id]}`}
            >
              <span className={classes.checkbox} />
              <span
                className={`${classes.icon} ${hasRoundedIcon ? classes.iconRound : ''}`}
              />
              <span className={classes.detail}>
                <h2 className={classes.name}>{data[listsKeys.name]}</h2>
                  {hasKnownMethods && (
                    <ol className={classes.methods}>
                      {data[listsKeys.methods].map((_, index) => (
                        <li
                          className={classes.methodLoading}
                          key={index}
                        />
                      ))}
                    </ol>
                  )}
              </span>
            </article>
          );
        }

        return (
          <article
            className={classes.item}
            key={`list-data-${data[listsKeys.id]}`}
          >
            <span className={classes.checkbox}>
              <Checkbox
                checked={obtained}
                disabled={unlockedByDefault}
                unsaved={unsaved}
                onChange={unlockedByDefault ? () => {} : handleObtainedChange}
              />
            </span>
            <span
              className={`${classes.icon} ${hasRoundedIcon ? classes.iconRound : ''} ${obtained ? `${classes.obtained} ${classes.obtainedIcon}` : ''}`}
              title={data[listsKeys.name]}
            >
              <Icon id={data[listsKeys.icon]} positions={iconPositions} source={source} />
            </span>
            <span className={classes.detail}>
              <h2 className={`${classes.name} ${obtained ? classes.obtained : ''}`}>
                {source === 'orchestrion' && data[listsKeys.order] !== 65535 && (
                  <small className={classes.orchestrionNumber}>
                    #{data[listsKeys.order]}{' '}
                  </small>
                )}
                {data[listsKeys.name]}
                {unsaved && (
                  <React.Fragment>
                    {' '}
                    <small className={classes.unsavedChanges}>
                      {locale.info.unsavedChanges}
                    </small>
                  </React.Fragment>
                )}
              </h2>
              {hasKnownMethods
                ? (
                  <ol className={`${classes.methods} ${obtained ? `${classes.obtained} ${classes.obtainedMethods}` : ''}`}>
                    {data[listsKeys.methods].map(([localeKey, icon, details], index) => {
                      
                      
                      return (
                        <li
                          className={classes.method}
                          key={index}
                        >
                          <span className={classes.methodIcon}>
                            <Icon id={icon} positions={methodIconPositions} source="methods" />
                          </span>
                          {
                            Array.isArray(details) && details.length
                            ? (
                              <span
                                className={classes.methodText}
                                dangerouslySetInnerHTML={{
                                  __html: localeInject(
                                    locale.obtainMethods[localeKey],
                                    ...details
                                  )
                                }}
                              />
                            ) : (
                              <span className={classes.methodText}>{locale.obtainMethods[localeKey]}</span>
                            )
                          }
                        </li>
                      )
                    })}
                  </ol>
                ) : (
                  <ol className={`${classes.methods} ${classes.methodUnknown}`}>
                    <li className={classes.method}>
                      {locale.info.noKnownObtainMethod}
                    </li>
                  </ol>
                )
              }
            </span>
          </article>
        )
      }}
    </VisibilitySensor>
  );
}

export default withRouter(ListItem);