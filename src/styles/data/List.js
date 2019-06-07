export default {
  list: {

  },
  patchEntries: {

  },
  item: {
    alignItems: 'center',
    borderBottom: {
      color: '#f5f5f5',
      style: 'solid',
      width: 4
    },
    display: 'flex',
    marginBottom: 0,
    padding: {
      bottom: 4,
      left: 8,
      right: 8,
      top: 4
    },

    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0
    }
  },
  icon: {
    alignSelf: 'flex-start',
    borderRadius: '4px',
    boxShadow: {
      blur: 2,
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
    color: '#616161',
    borderBottom: {
      color: '#ccc',
      style: 'dotted',
      width: 1
    },
    paddingBottom: 4,

    '&:last-child': {
      borderBottom: 0
    }
  },
  methodIcon: {
    display: 'inline-block',
    height: 24,
    verticalAlign: 'bottom'
  }
}