import React from "react";
import injectSheet, { ThemeProvider } from 'react-jss';
import { LocalisationContext, localisation } from 'contexts/localisation';
import { ThemeContext, themes } from 'contexts/theme';

export default (props) => {
  const Component = injectSheet(props.style)(props.children.type);

  return (
    <ThemeContext.Consumer>
      {theme => (
        <ThemeProvider theme={themes[theme]}>
          <LocalisationContext.Consumer>
            {locale => (
              <Component locale={localisation[locale]} />
            )}
          </LocalisationContext.Consumer>
        </ThemeProvider>
      )}
    </ThemeContext.Consumer>
  )
};