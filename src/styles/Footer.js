export default {
  footer: theme => ({
    borderTop: {
      color: theme.border,
      style: 'solid',
      width: 1
    },
    color: theme.colorUnimportant,
    fontSize: 14,
    lineHeight: '17px',
    marginTop: 32,
    paddingTop: 8
  }),
  copyright: {
    marginBottom: 4
  },
  apiVersion: theme => ({
    color: theme.colorMid,
    fontSize: 12,
    lineHeight: '15px'
  }),
  disclaimer: theme => ({
    color: theme.colorMid,
    fontSize: 10,
    lineHeight: '13px',
    margin: 0
  })
}