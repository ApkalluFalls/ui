export default {
  checkbox: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    transition: 'color .1s',
    width: 32
  },
  checkboxChecked: theme => ({
    color: theme.color,

    '&:hover, &:focus': {
      color: theme.colorUnimportant
    }
  }),
  checkboxUnchecked: theme => ({
    color: theme.colorUnimportant,

    '&:hover, &:focus': {
      color: theme.color
    }
  }),
  checkboxUnsaved: theme => ({
    color: theme.form.checkboxUnsaved
  })
}