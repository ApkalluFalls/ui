export default theme => ({
  container: {
    color: 'inherit'
  },
  heading: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '16px',
    margin: {
      bottom: 4,
      top: 0
    }
  },
  requiresSignIn: {
    color: theme.colorSubtle,
    fontSize: 12,
    lineHeight: '15px',
    margin: {
      bottom: 0,
      top: -4
    }
  }
})