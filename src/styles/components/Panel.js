export default theme => ({
  panel: {
    background: theme.panel.background,
    border: {
      color: theme.panel.border,
      style: 'solid',
      width: 1
    },
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      spread: null,
      color: theme.shadow
    },
    marginBottom: 20,
    padding: 24
  }
});