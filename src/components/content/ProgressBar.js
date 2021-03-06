import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/content/ProgressBar';

const useStyles = createUseStyles(style);

function ProgressBar({
  limit = 0,
  unsaved = false,
  value = 0
}) {
  const classes = useStyles(useContext(ThemeContext));
  const percentage = `${limit ? Math.ceil(((100 / limit) * value) * 10) / 10 : 100}%`;

  return (
    <section className={classes.container}>
      <div
        className={classes.progress}
        role="progress"
      >
        <div
          className={`${classes.bar} ${unsaved ? classes.barUnsaved : ''}`}
          style={{
            width: percentage
          }}
        />
      </div>
      <div className={`${classes.caption} ${unsaved ? classes.unsaved : ''}`}>
        <span className={classes.value}>
          {value.toLocaleString()}
          {' '}
          <span className={classes.limit}>
            of {limit.toLocaleString()}
          </span>
        </span>
        <span className={classes.percent}>
          {percentage}
        </span>
      </div>
    </section>
  )
}

export default ProgressBar;