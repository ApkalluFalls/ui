export default theme => ({
  '@global': {
    'html, body': {
      background: theme.background,
      color: theme.color,
      fontFamily: `'PT Sans', sans-serif`
    },

    'button, input, textarea': {
      color: theme.color,
      fontFamily: `'PT Sans', sans-serif`
    },

    'h1': {
      margin: {
        bottom: 8,
        top: 0
      }
    },

    'p': {
      margin: {
        bottom: 8,
        top: 0
      }
    },

    'a, a:visited': {
      color: theme.link,
      textDecoration: 'none',

      '&:hover, &:focus': {
        color: theme.linkHoverFocus
      },

      '&:active': {
        color: theme.linkActive
      }
    }
  }
})