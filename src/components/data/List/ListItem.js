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
  const locale = useContext(LocalisationContext);
  const text = localisation[locale];

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
                className={classes.icon}
              />
              <span className={classes.detail}>
                <h2 className={classes.name}>{data.n}</h2>
                  {Array.isArray(data.m) && data.m.length > 0 && (
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
              className={classes.icon}
              title={data.n}
            >
              <Icon id={data.i} positions={iconPositions} source={source} />
            </span>
            <span className={classes.detail}>
              <h2 className={classes.name}>{data.n}</h2>
              {Array.isArray(data.m) && data.m.length > 0 && (
                <ol className={classes.methods}>
                  {data.m.map(([localeKey, icon, details], index) => {
                    console.info(localeKey);
                    return (
                      <li
                        className={classes.method}
                        key={index}
                      >
                        <span className={classes.methodIcon}>
                          <Icon id={icon} positions={methodIconPositions} source="methods" />
                        </span>
                        {
                          Array.isArray(details)
                          ? (
                            <span
                              className={classes.methodText}
                              dangerouslySetInnerHTML={{
                                __html: localeInject(
                                  text.obtainMethods[localeKey],
                                  ...details
                                )
                              }}
                            />
                          ) : (
                            <span className={classes.methodText}>{text.obtainMethods[localeKey]}</span>
                          )
                        }
                      </li>
                    )
                  })}
                </ol>
              )}
            </span>
          </article>
        )
      }}
    </VisibilitySensor>
  );
}

export default ListItem;