/**
 * The `<AFComponent />` utility component wraps other components with themeing and localisation support.
 * @module [{js}AFComponent]
 * @prop {Object} props.style - Style rules to apply on the wrapped component.
 */
import React from "react";
import injectSheet, { ThemeProvider } from 'react-jss';
import { LocalisationContext, localisation, localeInject } from 'contexts/localisation';
import { ThemeContext, themes } from 'contexts/theme';

export default (props) => {
  const Component = injectSheet((theme) => props.style(theme, props.source))(props.children.type);

  // Is there a better way to do this?
  const wrappedChildren = props.children.props && props.children.props.children || undefined;

  return (
    <ThemeContext.Consumer>
      {theme => (
        <ThemeProvider theme={themes[theme]} source={props.source}>
          <LocalisationContext.Consumer>
            {locale => (
              <Component
                locale={localisation[locale]}
                localeInject={localeInject}
                {...props}
                children={wrappedChildren}
              />
            )}
          </LocalisationContext.Consumer>
        </ThemeProvider>
      )}
    </ThemeContext.Consumer>
  )
};