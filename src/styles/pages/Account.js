import formStyles from '../forms';

export default theme => ({
  ...formStyles(theme),
  help: {
    fontSize: 14,
    lineHeight: '17px',
    margin: {
      bottom: 16,
      top: 0
    }
  }
});