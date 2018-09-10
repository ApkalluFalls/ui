export default theme => ({
  opener: {
    color: theme.link,
    cursor: 'help',
    fontSize: 13,

    '&:hover, &:focus': {
      color: theme.linkHover,
      textDecoration: 'underline'
    }
  },
  wrapper: {
    background: theme.popup.backdrop,
    display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
    padding: '100px 0',
    position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    zIndex: 9
  },
  popup: {
    background: theme.popup.background,
    border: {
      color: theme.popup.border,
      style: 'solid',
      width: 1
    },
    borderRadius: 4,
    boxShadow: {
      x: 2,
      y: 2,
      blur: 32,
      spread: 0,
      color: theme.popup.shadow
    },
    maxHeight: 500,
    minWidth: 320,
    padding: 24,
    position: 'relative',
    width: '75vw',

    '& h1': {
      fontSize: 20,
      display: 'block',
      fallbacks: [
        {display: 'box'},
        {display: 'flex-box'}
      ]
    }
  },
  close: {
    background: 'transparent',
    border: 'none',
    color: theme.popup.close,
    cursor: 'pointer',
    fontSize: 16,
    position: 'absolute',
      right: 10,
      top: 10
  },
  footer: {
    borderTop: {
      color: theme.popup.footer.border,
      style: 'solid',
      width: 1
    },
    margin: {
      bottom: -10,
      left: 0,
      right: 0,
      top: 10
    },
    paddingTop: 10,
    textAlign: 'right',

    '& button': {
      background: 'transparent',
      border: 'none',
      color: theme.button.color,
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  }
});