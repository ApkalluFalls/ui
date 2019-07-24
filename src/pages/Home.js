import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import Panel from 'components/content/Panel';

function Home({
  classes
}) {
  const { locale } = useContext(LocalisationContext);
  const { home: pageLocale } = locale.pages;
  const { whatIsHidden } = pageLocale;

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p>{pageLocale.about}</p>
      <Panel heading={whatIsHidden.heading}>
        <p>{whatIsHidden.intro}</p>
        <ul>
          <li>{whatIsHidden.li1}</li>
          <li>{whatIsHidden.li2}</li>
          <li>{whatIsHidden.li3}</li>
          <li>{whatIsHidden.li4}</li>
          <li>{whatIsHidden.li5}</li>
          <li>{whatIsHidden.li6}</li>
          <li>{whatIsHidden.li7}</li>
        </ul>
        <p>{whatIsHidden.outro}</p>
      </Panel>
    </React.Fragment>
  )
}

export default Home;