import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/PageLoader';

const useStyles = createUseStyles(style);

function PageLoader({ text }) {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <section className={classes.loader}>
      <p className={`${classes.caption} ${text ? '' : classes.iconOnly}`}>
        <span className="fal fa-spinner-third fa-spin" />
        {text && (
          <React.Fragment>
            {' '}
            {text}
          </React.Fragment>
        )}
      </p>
    </section>
  )
}

export default PageLoader;