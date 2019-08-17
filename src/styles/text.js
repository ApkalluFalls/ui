export default {
  help: theme => ({
    color: theme.colorSubtle,
    fontSize: 14,
    lineHeight: '17px',
    margin: '0 0 8px',

    '&:last-child': {
      marginBottom: 0
    }
  }),
  helpError: theme => ({
    color: theme.colorError
  }),
  helpHeading: theme => ({
    color: theme.color,
    fontSize: 16,
    lineHeight: '19px',
    margin: '0 0 4px'
  }),
  helpUnimportant: theme => ({
    color: theme.colorUnimportant
  }),
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
  }),
  list: theme => ({
    marginTop: 0,

    '&:last-child': {
      marginBottom: 0
    }
  }),
  listItem: theme => ({
    color: theme.colorSubtle,
    fontSize: 14,
    marginBottom: 8,

    '&:last-child': {
      marginBottom: 0
    }
  }),
}