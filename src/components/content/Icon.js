import React from 'react';
import API from 'js/api';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/content/Icon';

function Icon(props) {
  if (props.positions) {
    const position = props.positions[props.id];

    if (!Array.isArray(position)) {
      return (
        <span className={props.classes.icon}>?</span>
      );
    }

    const [
      x,
      y,
      height = 40,
      width = 40
    ] = position;

    return (
      <span
        className={props.classes.icon}
        style={{
          backgroundImage: `url(${API.spritesheet(props.source)})`,
          backgroundPositionX: -x,
          backgroundPositionY: -y,
          height,
          width
        }}
      />
    );
  }

  return (
    <span>??ICON??</span>
  )
}

export default injectSheet(style)(Icon);