import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/InlineLoader';

function InlineLoader({
  text
}) {
  const classes = createUseStyles(style(useContext(ThemeContext)))();

  return (
    <div className={classes.inlineLoader}>
      <span className={`fas fa-cog fa-spin ${classes.icon}`} />
      {text && (
        <React.Fragment>
          {' '}
          {text}
        </React.Fragment>
      )}
    </div>
  );
}

export default InlineLoader;