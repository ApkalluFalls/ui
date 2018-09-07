export default theme => ({
  '@global': {
    'html, body': {
      fontFamily: `'Roboto', sans-serif`,
      height: '100%',
      margin: 0
    },
    'body > section': {
      background: theme.background,
      height: '100%',
      position: 'relative'
    },
    'a, a:visited': {
      color: theme.link,
      textDecoration: 'none'
    }
  },
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