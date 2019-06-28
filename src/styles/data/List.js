export default {
  list: {

  },
  patchList: {

  },
  patchListItem: {
    borderColor: '#333',
    overflow: 'hidden',
    padding: 0
  },
  patchListPlaceholder: {
    height: 256
  },
  patchListItemHeading: {
    alignItems: 'center',
    background: '#333',
    border: 0,
    border: {
      color: '#616161',
      style: 'solid',
      width: 1
    },
    boxShadow: {
      blur: 0,
      color: '#333',
      spread: 1,
      x: 0,
      y: 1
    },
    boxSizing: 'border-box',
    color: '#f2f2f2',
    display: 'flex',
    height: 32,
    margin: 0,
    padding: '0 8px',
    width: '100%'
  },
  item: {
    alignItems: 'center',
    borderBottom: {
      color: '#616161',
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
  },
  icon: {
    alignSelf: 'flex-start',
    background: '#616161',
    borderRadius: '4px',
    boxShadow: {
      blur: 2,
      color: '#333',
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
    zIndex: 2
  },
  detail: {
    flex: {
      grow: 1
    }
  },
  name: {
    fontSize: 16,
    margin: 0
  },
  methods: {
    background: '#7f7f7f',
    borderTop: {
      color: '#6f6f6f',
      style: 'solid',
      width: 1
    },
    boxShadow: {
      blur: 1,
      color: '#616161',
      inset: 'inset',
      spread: 0,
      x: 0,
      y: 1
    },
    listStyle: 'none',
    margin: {
      bottom: -8,
      left: -58,
      right: -8,
      top: 4
    },
    padding: {
      bottom: 8,
      left: 58,
      right: 8,
      top: 8
    },
    zIndex: 1
  },
  methodUnknown: {
    background: '#777665'
  },
  method: {
    alignItems: 'center',
    borderBottom: {
      color: '#616161',
      style: 'dotted',
      width: 1
    },
    color: '#f2f2f2',
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
  },
  methodLoading: {
    background: '#757575',
    display: 'block',
    height: 18,
    marginBottom: 5,

    '&:last-child': {
      marginBottom: 4
    }
  },
  methodIcon: {
    display: 'inline-block',
    height: 24,
    marginLeft: -6,
    marginTop: -2,
    verticalAlign: 'top'
  },
  methodText: {
    flexGrow: 1
  }
}