import React, { useContext } from 'react';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from 'contexts/theme';
import Panel from 'components/content/Panel';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/pages/Home';

const useStyles = createUseStyles(style);

function Home() {
  const classes = useStyles(useContext(ThemeContext));
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