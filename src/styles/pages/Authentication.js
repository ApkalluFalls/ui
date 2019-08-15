import brandStyles from '../brands';
import formStyles from '../forms';

export default () => {
  const noticeDefaults = {
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 14,
    lineHeight: '17px',
    margin: {
      bottom: 20,
      top: 0
    },
    padding: 8
  };

  return {
    ...formStyles(),
    help: theme => ({
      borderBottom: {
        color: theme.border,
        style: 'solid',
        width: 1
      },
      marginBottom: 16,
      paddingBottom: 16
    }),
    firebaseValidationError: theme => ({
      ...noticeDefaults,
      borderColor: theme.form.validationError,
      color: theme.form.validationError
    }),
    emailResetNotice: theme => ({
      ...noticeDefaults,
      borderColor: theme.border,
      color: theme.color
    }),
    formArea: {
      margin: {
        bottom: 0,
        left: 'auto',
        right: 'auto',
        top: 20
      },
      maxWidth: 360
    },
    alternativeMethods: theme => ({
      borderTop: {
        color: theme.border,
        style: 'dotted',
        width: 1
      },
      color: theme.colorSubtle,
      fontSize: 14,
      marginTop: 8,
      paddingTop: 12,
    }),
    facebook: () => ({
      background: brandStyles.facebook,
      borderColor: brandStyles.facebook,
      color: '#fff',
      transition: 'background .1s, border .1s',

      '&:hover, &:focus': {
        background: brandStyles.facebookAlt,
        borderColor: brandStyles.facebookAlt
      },

      '&:disabled': {
        background: brandStyles.facebook,
        borderColor: brandStyles.facebook
      }
    }),
    google: () => ({
      background: brandStyles.google,
      borderColor: brandStyles.google,
      color: '#fff',
      transition: 'background .1s, border .1s',

      '&:hover, &:focus': {
        background: brandStyles.googleAlt,
        borderColor: brandStyles.googleAlt,
      },

      '&:disabled': {
        background: brandStyles.google,
        borderColor: brandStyles.google
      }
    }),
    twitter: () => ({
      background: brandStyles.twitter,
      borderColor: brandStyles.twitter,
      color: '#fff',
      transition: 'background .1s, border .1s',

      '&:hover, &:focus': {
        background: brandStyles.twitterAlt,
        borderColor: brandStyles.twitterAlt
      },

      '&:disabled': {
        background: brandStyles.twitter,
        borderColor: brandStyles.twitter
      }
    })
  };
}