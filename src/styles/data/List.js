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
    display: 'flex',
    marginBottom: 0,
    padding: 8,

    '&:nth-child(odd)': {
      background: '#6f6f6f',
      borderBottom: {
        color: '#616161',
        style: 'solid',
        width: 1
      },
      borderTop: {
        color: '#616161',
        style: 'solid',
        width: 1
      }
    },

    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0
    }
  },
  icon: {
    alignSelf: 'flex-start',
    background: '#f2f2f2',
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
    marginRight: 8
  },
  detail: {
    flex: {
      grow: 1
    }
  },
  name: {
    fontSize: 20,
    margin: 0
  },
  methods: {
    listStyle: 'none',
    marginBottom: 0,
    marginTop: 4,
    padding: 0
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
    verticalAlign: 'top',

    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0
    }
  },
  methodLoading: {
    background: '#f2f2f2',
    display: 'block',
    height: 18,
    marginBottom: 4
  },
  methodIcon: {
    display: 'inline-block',
    height: 24,
    marginTop: -6,
    verticalAlign: 'top'
  },
  methodText: {
    flexGrow: 1
  }
}