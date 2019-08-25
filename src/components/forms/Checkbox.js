import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/forms/Checkbox';

const useStyles = createUseStyles(style);

function Checkbox({
  checked: checkedProp = false,
  disabled = false,
  unsaved = false,
  onChange = () => {}
}) {
  const classes = useStyles(useContext(ThemeContext));
  const [checked, setChecked] = useState(checkedProp);
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

  if (disabled) {
    return (
      <div className={`${classes.checkbox} ${classes.checkboxDisabled} ${checked ? classes.checkboxChecked : classes.checkboxUnchecked}`}>
        <span className={`fal fa-${checked ? 'check' : 'times'}`} />
      </div>
    )
  }

  return (
    <div
      className={`${classes.checkbox} ${checked ? classes.checkboxChecked : classes.checkboxUnchecked} ${unsaved ? classes.checkboxUnsaved : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleCheckboxChange}
      onKeyDown={(event) => { return event.which === 13 && handleCheckboxChange() }}
    >
      <span className={`fal fa-${checked ? 'check' : 'times'}`} />
    </div>
  )
}

export default Checkbox;