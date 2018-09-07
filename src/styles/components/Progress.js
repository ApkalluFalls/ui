const local = {
  progressBarHeight: 4
};

export default theme => ({
  progress: {
    margin: 0
  },
  caption: {
    fontSize: 14,
    marginBottom: local.progressBarHeight
  },
  wrapper: {
    background: theme.progressBar.background,
    boxShadow: {
      x: 2,
      y: 2,
      blur: 2,
      spread: null,
      color: theme.progressBar.shadow
    },
    height: local.progressBarHeight,
    marginBottom: local.progressBarHeight
  },
  bar: {
    background: theme.progressBar.foreground,
    color: 'transparent',
    display: 'block',
    fontSize: 0,
    height: local.progressBarHeight
  },
  textWrapper: {
    display: 'flex',
    fontSize: 12,
    width: '100%'
  },
  count: {
    flexGrow: 1
  },
  percentage: {
    textAlign: 'right'
  }
});