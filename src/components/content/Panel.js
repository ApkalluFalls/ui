import React from 'react';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/Panel';

function Panel({
  children,
  classes,
  heading
}) {
  return (
    <section className={classes.panel}>
      {heading && (
        <h1 className={classes.heading}>{heading}</h1>
      )}
      {children}
    </section>
  )
}

export default injectSheet(style)(Panel);