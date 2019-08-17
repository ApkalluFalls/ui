import formStyles from 'styles/forms.js';

export default {
  switch: {
    position: 'relative'
  },
  checkbox: {
    display: 'none'
  },
  track: theme => ({
    background: theme.form.switchTrackBackgroundOff,
    border: {
      color: theme.form.switchTrackBorderOff,
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
  }),
  trackOn: theme => ({
    background: theme.form.switchTrackBackground,
    borderColor: theme.form.switchTrackBorder
  }),
  ball: theme => ({
    background: theme.form.switchBallBackgroundOff,
    border: {
      color: theme.form.switchBallBorderOff,
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
  }),
  ballOn: theme => ({
    background: theme.form.switchBallBackground,
    borderColor: theme.form.switchBallBorder,
    left: 'calc(100% - 15px)'
  }),
  label: theme => ({
    ...formStyles().label(theme),
    color: theme.color,
    cursor: 'pointer',
    paddingLeft: 48,
    transition: 'color .2s',
    userSelect: 'none'
  }),
  labelOn: {
    fontWeight: 'bold'
  }
}