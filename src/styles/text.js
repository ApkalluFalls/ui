export default {
  hyperlink: theme => ({
    color: theme.link,

    '&:visited': {
      color: theme.link
    },

    '&:hover, &:focus': {
      color: theme.linkHoverFocus
    },

    '&:active': {
      color: theme.linkActive
    }
  })
}