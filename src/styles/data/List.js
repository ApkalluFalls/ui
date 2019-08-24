export default {
  list: {

  },
  patchList: {

  },
  patchListItem: {
    overflow: 'hidden',
    padding: 0
  },
  patchListPlaceholder: {
    height: 256
  },
  patchListItemHeading: theme => ({
    alignItems: 'center',
    background: theme.list.heading,
    border: 0,
    borderBottom: {
      color: theme.border,
      style: 'solid',
      width: 1
    },
    boxSizing: 'border-box',
    boxShadow: {
      color: theme.list.headingShadow,
      inset: 'inset',
      spread: 1,
      x: 0,
      y: 0
    },
    display: 'flex',
    height: 32,
    margin: 0,
    padding: '0 8px',
    width: '100%'
  }),
  item: theme => ({
    alignItems: 'center',
    borderBottom: {
      color: theme.border,
      style: 'solid',
      width: 1
    },
    display: 'flex',
    marginBottom: 0,
    padding: 8,

    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0
    }
  }),
  icon: theme => ({
    alignSelf: 'flex-start',
    background: theme.list.methodBorder,
    borderRadius: '4px',
    boxShadow: {
      blur: 2,
      color: theme.shadow,
      x: 1,
      y: 1
    },
    flex: {
      basis: 40,
      grow: 0,
      shrink: 0
    },
    height: 40,
    marginRight: 10,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 2
  }),
  iconRound: {
    borderRadius: '100%'
  },
  checkbox: {
    alignSelf: 'flex-start',
    flex: {
      basis: 40,
      grow: 0,
      shrink: 0
    },
    position: 'relative',
    textDecoration: 'none',
    zIndex: 2
  },
  detail: {
    flex: {
      grow: 1
    }
  },
  name: theme => ({
    fontSize: 16,
    margin: 0,
    textShadow: {
      blur: 1,
      color: theme.textShadow,
      x: 1,
      y: 1
    },
    textTransform: 'capitalize'
  }),
  orchestrionNumber: {
    fontWeight: 'normal'
  },
  methods: theme => ({
    background: theme.list.methods,
    borderTop: {
      color: theme.border,
      style: 'solid',
      width: 1
    },
    boxShadow: {
      color: theme.list.methodShadow,
      inset: 'inset',
      spread: 1,
      x: 0,
      y: 0
    },
    listStyle: 'none',
    margin: {
      bottom: -8,
      left: -98,
      right: -8,
      top: 4
    },
    padding: {
      bottom: 8,
      left: 98,
      right: 8,
      top: 8
    },
    zIndex: 1
  }),
  methodUnknown: theme => ({
    background: theme.list.methodUnknown
  }),
  method: theme => ({
    alignItems: 'center',
    borderBottom: {
      color: theme.list.methodBorder,
      style: 'dotted',
      width: 1
    },
    display: 'flex',
    fontSize: 14,
    lineHeight: '14px',
    marginBottom: 4,
    paddingBottom: 4,
    verticalAlign: 'top',

    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0,
      paddingBottom: 0
    }
  }),
  methodLoading: theme => ({
    background: theme.methodShadow,
    display: 'block',
    height: 18,
    marginBottom: 5,

    '&:last-child': {
      marginBottom: 4
    }
  }),
  methodIcon: {
    display: 'inline-block',
    height: 24,
    marginLeft: -6,
    marginTop: -2,
    verticalAlign: 'top'
  },
  methodText: {
    flexGrow: 1
  },
  obtained: theme => ({
    color: theme.colorUnimportant,
    fontWeight: 'normal',
    textShadow: 'initial'
  }),
  obtainedIcon: {
    filter: 'grayscale(1)',
    marginBottom: -10,
    marginTop: -10,
    opacity: 0.6,
    transform: 'scale(0.6)'
  },
  obtainedMethods: {
    display: 'none',
    filter: 'grayscale(1)'
  },
  unsavedChanges: theme => ({
    color: theme.unsaved,
    fontSize: 12,
    lineHeight: '15px',
    marginLeft: 20
  })
}