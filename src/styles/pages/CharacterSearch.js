import formStyles from '../forms';

export default theme => ({
  ...formStyles(theme),
  help: {
    color: theme.colorSubtle,
    fontSize: 14,
    lineHeight: '17px',
    marginTop: 12
  },
  helpIndented: {
    color: theme.colorUnimportant,
    fontSize: 14,
    lineHeight: '17px',
    marginLeft: 8,
    marginTop: 12
  },
  section: {
    marginBottom: 24,

    '&:last-child': {
      marginBottom: 0
    }
  },
  buttonsWrapper: {
    alignItems: 'center',
    display: 'flex'
  },
  buttons: {
    alignItems: 'center',
    display: 'flex',
    flex: {
      grow: 1,
      wrap: 'wrap'
    }
  },
  buttonsLabel: {
    flex: {
      basis: 32,
      shrink: 0
    },
    fontSize: 24,
    marginRight: 8,
    marginBottom: 8,
    textAlign: 'center'
  },
  buttonsIcon: {
    color: theme.colorUnimportant,
    verticalAlign: 'middle'
  },
  buttonWrapper: {
    flex: {
      basis: 136,
      shrink: 0
    },
    marginRight: 8,
    marginBottom: 8,

    '&:last-child': {
      marginRight: 0
    }
  },
  buttonActive: {
    background: theme.color,
    borderColor: theme.color,
    color: theme.background,
    cursor: 'default',

    '&:hover, &:focus, &[disabled]': {
      background: theme.color,
      borderColor: theme.color,
      color: theme.background,
    }
  },
  inputField: {
    flex: {
      grow: 1,
      shrink: 0
    },
    marginBottom: 8
  },
  results: {
    borderTop: {
      color: 'transparent',
      style: 'solid',
      width: 1
    },
    height: 0,
    marginTop: 12,
    overflow: 'hidden',
    paddingTop: 12,
    transition: 'height .2s'
  },
  resultsSearchingOrNoMatches: {
    borderTopColor: theme.border,
    height: 20
  },
  resultsWithMatches: {

  },
  noResultsFound: {
    color: theme.colorSubtle,
    fontSize: 14,
    lineHeight: '20px'
  }
});