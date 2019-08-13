import brandStyles from '../brands';
import formStyles from '../forms';

export default theme => ({
  ...formStyles(theme),
  help: {
    borderBottom: {
      color: theme.border,
      style: 'solid',
      width: 1
    },
    marginBottom: 16,
    paddingBottom: 16
  },
  formArea: {
    margin: {
      bottom: 0,
      left: 'auto',
      right: 'auto',
      top: 20
    },
    maxWidth: 360
  },
  alternativeMethods: {
    borderTop: {
      color: theme.border,
      style: 'dotted',
      width: 1
    },
    color: theme.colorSubtle,
    fontSize: 14,
    marginTop: 8,
    paddingTop: 12,
  },
  facebook: {
    background: brandStyles.facebook,
    borderColor: brandStyles.facebook,
    color: '#fff',
    transition: 'background .1s, border .1s',

    '&:hover, &:focus': {
      background: brandStyles.facebookAlt,
      borderColor: brandStyles.facebookAlt
    }
  },
  google: {
    background: brandStyles.google,
    borderColor: brandStyles.google,
    color: '#fff',
    transition: 'background .1s, border .1s',

    '&:hover, &:focus': {
      background: brandStyles.googleAlt,
      borderColor: brandStyles.googleAlt,
    }
  },
  twitter: {
    background: brandStyles.twitter,
    borderColor: brandStyles.twitter,
    color: '#fff',
    transition: 'background .1s, border .1s',

    '&:hover, &:focus': {
      background: brandStyles.twitterAlt,
      borderColor: brandStyles.twitterAlt
    }
  }
});