import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import Panel from 'components/content/Panel';

function Home({
  classes
}) {
  const { locale } = useContext(LocalisationContext);
  const { authentication: pageLocale } = locale.pages;

  return (
    <React.Fragment>
      <h1>{pageLocale.heading}</h1>
      <p>{pageLocale.about}</p>
      <Panel>
      </Panel>
    </React.Fragment>
  )
}

export default Home;