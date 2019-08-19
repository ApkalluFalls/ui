import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import CharacterCard from 'components/content/CharacterCard';
import PageLoader from 'components/content/PageLoader';
import Panel from 'components/content/Panel';
import FreeCompany from 'js/freeCompany';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/FreeCompany';

const useStyles = createUseStyles(style);

function FreeCompanyPage({ match }) {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const { freeCompany: pageLocale } = locale.pages;

  const { freeCompanyId } = match.params;

  const [freeCompany, setFreeCompany] = useState();

  useEffect(() => {
    (async () => {
      const freeCompany = await new FreeCompany(freeCompanyId).getData();
      setFreeCompany(freeCompany);
    })()
  }, []);

  if (!freeCompany) {
    return (
      <PageLoader text={locale.info.communicatingWithXIVAPI} />
    );
  }

  const {
    crest,
    dc: dataCenter,
    estate,
    formed,
    memberRanks,
    name,
    slogan,
    tag,
    world
  } = freeCompany;

  const daysSinceFormed = Math.round((Number(new Date()) - formed) / 86400000);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div
          className={classes.crest}
          role="presentation"
          style={crest && {
            backgroundImage: 'initial'
          }}
        >
          {crest.map(crestPart => (
            <span
              key={crestPart}
              className={classes.crestPart}
              style={{
                backgroundImage: `url(${crestPart})`
              }}
            />
          ))}
        </div>
        <section className={classes.details}>
          <h1 className={classes.name}>
            {name}
            {' '}
            <span className={classes.tag}>
              «{tag}»
            </span>
          </h1>
          <p className={`${classes.tagline} ${classes.taglineSmall}`}>
            {dataCenter && (
              <React.Fragment>
                {dataCenter}
                {' '}
                <span className="fal fa-long-arrow-right" />
                {' '}
              </React.Fragment>
            )}
            {world}
          </p>
        </section>
        <section className={classes.actions}>
        </section>
      </header>
      <section className={classes.section}>
        <h2 className={classes.sectionHeading}>
          {pageLocale.formed}
        </h2>
        <article className={classes.infoBlock}>
          <span className={`fal fa-clock ${classes.infoBlockIcon}`}/>
          {pageLocale.daysSinceFormed(daysSinceFormed)}
        </article>
      </section>
      {estate && (
        <section className={classes.section}>
          <h2 className={classes.sectionHeading}>
            {pageLocale.estate}
          </h2>
          <article className={classes.infoBlock}>
            <span className={`fal fa-home ${classes.infoBlockIcon}`}/>
            {estate.name} &mdash; {estate.plot}
          </article>
        </section>
      )}
      {slogan && (
        <section className={classes.section}>
          <h2 className={classes.sectionHeading}>
            {pageLocale.slogan}
          </h2>
          <blockquote className={classes.slogan}>
            <span className={`fal fa-file-alt ${classes.infoBlockIcon}`}/>
            {slogan}
          </blockquote>
        </section>
      )}
      <Panel heading={pageLocale.members}>
        {memberRanks.length
          ? memberRanks.map(rank => (
            <section
              className={classes.memberRank}
              key={`${rank.name}-${rank.icon}`}
            >
              <header className={classes.memberRankHeading}>
                <span
                  className={classes.memberRankIcon}
                  role="presentation"
                  style={{
                    backgroundImage: `url(${rank.icon})`
                  }}
                />
                <h2 className={classes.memberRankName}>
                  {rank.name}
                </h2>
              </header>
              <article className={classes.members}>
                {rank.members.map(character => (
                  <CharacterCard
                    key={character.id}
                    {...character}
                  />
                ))}
              </article>
            </section>
          )) : (
            <p className={classes.help}>
              <span className="fal fa-frown" />
              {' '}
              {pageLocale.noMembers}
            </p>
          )
        }
      </Panel>
    </React.Fragment>
  )
}

export default withRouter(FreeCompanyPage);