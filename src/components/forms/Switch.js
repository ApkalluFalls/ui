import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/forms/Switch';

const useStyles = createUseStyles(style);

function Switch({
  id = 'switch',
  label,
  on = false,
  onChange = () => {}
}) {
  const classes = useStyles(useContext(ThemeContext));

  const [checked, setChecked] = useState(on);
  const isLoading = useRef(true);

  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;
      return;
    }

    onChange(checked);
  }, [checked])

  /**
   * When the checkbox changes, toggle the switch.
   */
  function handleCheckboxChange() {
    setChecked(!checked);
  }

  return (
    <div className={classes.switch}>
      <input
        type="checkbox"
        className={classes.checkbox}
        id={id}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={`${classes.track} ${checked ? classes.trackOn : ''}`}>
        <span className={`${classes.ball} ${checked ? classes.ballOn : ''}`} />
      </span>
      <label
        htmlFor={id}
        className={`${classes.label} ${checked ? classes.labelOn : ''}`}
      >
        {label}
      </label>
    </div>
  )
}

export default Switch;