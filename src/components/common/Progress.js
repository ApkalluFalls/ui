/**
 * The `<Progress />` component displays a progress bar with caption, value, total and percentage.
 * @module [{components/common}Progress]
 * @prop {string} props.caption - Text to display within the `figcaption` element and `aria-valuetext` arribute.
 * @prop {Number} props.total - The maximum value for the progress bar, also used within `aria-valuemax`.
 * @prop {Number} props.value - The current value for the progress bar, also used within `aria-valuenow`.
 * @example <Progress caption="Minions" value="5" total="220" />
 */
import React from "react";
import AFComponent from "components/AFComponent";

import style from "styles/common/Progress";

const Progress = ({
  caption,
  classes,
  locale,
  localeInject,
  total,
  value
}) => {
  const percentage = Math.floor((100/total) * value);

  return (
    <figure className={classes.progress}>
      <figcaption className={classes.caption}>
        {caption}
      </figcaption>
      <div className={classes.wrapper}>
        <span
          aria-valuemax={total}
          aria-valuemin="0"
          aria-valuenow={value}
          aria-valuetext={caption}
          className={classes.bar}
          role="progressbar"
          style={{
            width: `${percentage}%`
          }}
        >
          {value}
        </span>
      </div>
      <div className={classes.textWrapper}>
        <span className={classes.count}>
          {localeInject(
            locale.components.progress.nOfN2,
            value,
            total
          )}
        </span>
        <span className={classes.percentage}>
          {percentage}%
        </span>
      </div>
    </figure>
  );
};

export default (props) => (
  <AFComponent style={style} {...props}>
    <Progress />
  </AFComponent>
)