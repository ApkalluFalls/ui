import formStyles from '../forms';

export default {
  ...formStyles(),
  help: theme => ({
    color: theme.colorSubtle,
    fontSize: 14,

    '&:last-child': {
      marginBottom: 0
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
  header: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 16,
    width: '100%'
  },
  avatar: theme => ({
    backgroundSize: 'cover',
    borderRadius: '100%',
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      color: theme.shadow
    },
    flex: {
      basis: 56,
      shrink: 0
    },
    height: 56,
    marginRight: 16
  }),
  details: {
    flex: {
      grow: 1
    }
  },
  actions: {
    textAlign: 'right'
  },
  freeCompanyTag: theme => ({
    color: theme.colorSubtle,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '19px'
  }),
  name: {
    fontSize: 24,
    marginBottom: 0
  },
  tagline: theme => ({
    color: theme.colorUnimportant,
    marginBottom: 0
  }),
  bioWrapper: theme => ({
    background: 'transparent',
    border: 'none',
    marginBottom: 16,
    padding: {
      bottom: 4,
      left: 16,
      right: 16,
      top: 4
    }
  }),
  bioHeading: theme => ({
    color: theme.colorUnimportant,
    fontSize: 14,
    lineHeight: '17px',
    margin: '0 0 4px'
  }),
  bio: theme => ({
    color: theme.colorMid,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: '17px',
    margin: 0,
    padding: 0
  }),
  bioQuoteIcon: theme => ({
    color: theme.border,
    fontSize: 12,
    lineHeight: '15px',
    marginRight: 8,
    verticalAlign: 'top'
  }),
  verifyCharacter: theme => ({
    background: theme.panel.background,
    boxShadow: {
      blur: 4,
      color: theme.panel.background,
      spread: 4,
      x: 0,
      y: 0
    },
    margin: '8px 0 0',
    padding: 16
  }),
  verifyCharacterHeading: theme => ({
    fontSize: 20,
    margin: {
      bottom: 8,
      top: 0
    }
  }),
  verificationCode: theme => ({
    border: {
      color: theme.verificationCode,
      radius: 4,
      style: 'dashed',
      width: 1
    },
    color: theme.verificationCode,
    display: 'inline-block',
    fontFamily: 'monospace',
    fontStyle: 'italic',
    margin: {
      left: 4,
      right: 16,
      top: 4
    },
    padding: '4px 8px'
  }),
  verificationCodeCopyOnClick: theme => ({
    cursor: 'copy'
  }),
  copyHelper: theme => ({
    color: theme.colorUnimportant,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: '16px',
    opacity: 0,
    transition: 'opacity .4s',
    userSelect: 'none'
  }),
  copyHelperCopied: theme => ({
    opacity: 1
  })
};