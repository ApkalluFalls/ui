import React from 'react';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/PageLoader';

function PageLoader({
  children,
  classes
}) {
  return (
    <figure className={classes.loader}>
      <figcaption className={classes.caption}>
        {children}
      </figcaption>
    </figure>
  )
}

export default injectSheet(style)(PageLoader);