import React from 'react';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/Panel';

function Panel({
  children,
  className,
  classes,
  heading,
  headingClassName
}) {
  return (
    <section className={`${classes.panel} ${className ? className : ''}`}>
      {heading && (
        <h1 className={`${classes.heading} ${headingClassName ? headingClassName : ''}`}>{heading}</h1>
      )}
      {children}
    </section>
  )
}

export default injectSheet(style)(Panel);