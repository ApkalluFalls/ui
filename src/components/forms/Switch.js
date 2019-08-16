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
  function handleSwitchChange() {
    setChecked(!checked);
  }

  return (
    <div className={classes.switch}>
      <span className={`${classes.track} ${checked ? classes.trackOn : ''}`}>
        <span className={`${classes.ball} ${checked ? classes.ballOn : ''}`} />
      </span>
      <div
        className={`${classes.label} ${checked ? classes.labelOn : ''}`}
        role="button"
        tabIndex={0}
        onClick={handleSwitchChange}
        onKeyDown={(event) => { return event.which === 13 && handleSwitchChange() }}
      >
        {label}
      </div>
    </div>
  )
}

export default Switch;