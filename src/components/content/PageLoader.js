import React from 'react';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/PageLoader';

function PageLoader({
  text,
  classes
}) {
  return (
    <section className={classes.loader}>
      <p className={`${classes.caption} ${text ? '' : classes.iconOnly}`}>
        <span class="fal fa-spinner-third fa-spin" />
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

export default injectSheet(style)(PageLoader);