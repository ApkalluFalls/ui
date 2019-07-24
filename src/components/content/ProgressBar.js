import React from 'react';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/ProgressBar';

function ProgressBar({
  classes,
  limit = 1,
  value = 0
}) {
  const percentage = `${Math.ceil(((100 / limit) * value) * 10) / 10}%`;

  return (
    <section className={classes.container}>
      <div
        className={classes.progress}
        role="progress"
      >
        <div
          className={classes.bar}
          style={{
            width: percentage
          }}
        />
      </div>
      <div className={classes.caption}>
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

export default injectSheet(style)(ProgressBar);