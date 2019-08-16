export default {
  freeCompanyTag: theme => ({
    color: theme.colorSubtle,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '19px'
  }),
  name: {
    marginBottom: 0
  },
  tagline: theme => ({
    color: theme.colorUnimportant
  }),
  bioWrapper: theme => ({
    background: theme.backgroundSubtle,
    borderLeft: {
      color: theme.border,
      style: 'solid',
      width: 4
    },
    padding: {
      bottom: 4,
      left: 12,
      right: 8,
      top: 4
    }
  }),
  bioHeading: theme => ({
    color: theme.colorUnimportant,
    fontSize: 14,
    lineHeight: '17px',
    margin: 0
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
  })
};