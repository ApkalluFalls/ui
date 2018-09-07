export default theme => ({
  container: {
    boxShadow: {
      x: 0,
      y: 0,
      blur: 3,
      spread: 2,
      color: theme.shadow
    },
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    padding: 15,
    position: 'absolute',
      right: 0,
      top: 0,
    width: 'calc(100% - 192px)',
    zIndex: 2
  }
});