import React, { useContext } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import Icon from 'components/content/Icon';
import { localeInject, LocalisationContext, localisation } from 'contexts/localisation';

function ListItem({
  classes,
  data,
  iconPositions,
  methodIconPositions,
  source
}) {
  // Contexts.
  const { locale } = useContext(LocalisationContext);

  const hasKnownMethods = Array.isArray(data.m) && data.m.length > 0;
  const hasRoundedIcon = source === 'orchestrion';

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
              key={`list-data-${data.id}`}
            >
              <span
                className={`${classes.icon} ${hasRoundedIcon ? classes.iconRound : ''}`}
              />
              <span className={classes.detail}>
                <h2 className={classes.name}>{data.n}</h2>
                  {hasKnownMethods && (
                    <ol className={classes.methods}>
                      {data.m.map((_, index) => (
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
            key={`list-data-${data.id}`}
          >
            <span
              className={`${classes.icon} ${hasRoundedIcon ? classes.iconRound : ''}`}
              title={data.n}
            >
              <Icon id={data.i} positions={iconPositions} source={source} />
            </span>
            <span className={classes.detail}>
              <h2 className={classes.name}>
                {source === 'orchestrion' && data.o !== 65535 && (
                  <small className={classes.orchestrionNumber}>
                    #{data.o}{' '}
                  </small>
                )}
                {data.n}
              </h2>
              {hasKnownMethods
                ? (
                  <ol className={classes.methods}>
                    {data.m.map(([localeKey, icon, details], index) => {
                      
                      
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

export default ListItem;