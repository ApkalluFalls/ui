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
    },
    'a:hover, a:focus, a:active': {
      color: theme.linkHover,
      textDecoration: 'underline'
    },
    'h1, h2, h3, h4, h5, h6, p': {
      margin: '0 0 10px'
    }
  },
  container: {
    boxShadow: {
      x: 0,
      y: 0,
      blur: 3,
      spread: 2,
      color: theme.container.shadow
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
  },
  footer: {
    borderTop: {
      color: theme.container.footer.border,
      style: 'solid',
      width: 1
    },
    color: theme.container.footer.color,
    marginTop: 15,
    paddingTop: 15
  },
  copyright: {
    fontSize: 14,
    marginBottom: 0
  },
  footerLinks: {
    display: 'inline-block'
  },
  disclaimer: {
    color: theme.faded,
    fontSize: 8
  }
});