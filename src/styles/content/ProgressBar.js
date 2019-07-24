export default {
  progress: {
    background: '#ccc',
    display: 'block',
    height: 2,
    overflow: 'hidden',
    width: '100%'
  },
  bar: {
    background: '#757575',
    display: 'block',
    height: '100%'
  },
  caption: {
    alignItems: 'center',
    color: '#333',
    display: 'flex',
    fontSize: 12,
    fontWeight: 'normal',
    height: 16,
    margin: {
      top: 4
    },
    width: '100%'
  },
  value: {
    flex: {
      grow: 1
    }
  },
  limit: {
    fontStyle: 'italic'
  },
  percent: {
    flex: {
      basis: 40
    },
    textAlign: 'right'
  }
}