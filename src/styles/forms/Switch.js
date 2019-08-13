import formStyles from '../forms';

export default (theme) => {
  const { form: formTheme } = theme;
  const { label: labelStyle } = formStyles(theme);

  return {
    switch: {
      position: 'relative'
    },
    checkbox: {
      display: 'none'
    },
    track: {
      background: formTheme.switchTrackBackgroundOff,
      border: {
        color: formTheme.switchTrackBorderOff,
        radius: 16,
        style: 'solid',
        width: 1
      },
      boxSizing: 'border-box',
      display: 'inline-block',
      height: 8,
      margin: 0,
      pointerEvents: 'none',
      position: 'absolute',
        left: 1,
        top: 5,
      transition: 'background .2s, border .2s',
      width: 32
    },
    trackOn: {
      background: formTheme.switchTrackBackground,
      borderColor: formTheme.switchTrackBorder
    },
    ball: {
      background: formTheme.switchBallBackgroundOff,
      border: {
        color: formTheme.switchBallBorderOff,
        radius: '100%',
        style: 'solid',
        width: 1
      },
      boxShadow: {
        blur: 2,
        color: theme.shadow,
        x: 1,
        y: 1
      },
      boxSizing: 'border-box',
      display: 'inline-block',
      height: 16,
      position: 'absolute',
        left: -2,
        top: -5,
      transition: 'background .2s, border .2s, left .2s',
      width: 16
    },
    ballOn: {
      background: formTheme.switchBallBackground,
      borderColor: formTheme.switchBallBorder,
      left: 'calc(100% - 15px)'
    },
    label: {
      ...labelStyle,
      cursor: 'pointer',
      paddingLeft: 48,
      transition: 'color .2s'
    },
    labelOn: {
      fontWeight: 'bold'
    }
  };
}