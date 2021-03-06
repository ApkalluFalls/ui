import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/Panel';

const useStyles = createUseStyles(style);

function Panel({
  children,
  classesOverride,
  className,
  heading,
  headingClassName
}) {
  const classes = classesOverride || useStyles(useContext(ThemeContext));

  return (
    <section className={`${classes.panel} ${className ? className : ''}`}>
      {heading && (
        <h1 className={`${classes.heading} ${headingClassName ? headingClassName : ''}`}>{heading}</h1>
      )}
      {children}
    </section>
  )
}

export default Panel;