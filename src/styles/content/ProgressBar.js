export default {
  progress: theme => ({
    background: theme.progress.background,
    display: 'block',
    height: 2,
    overflow: 'hidden',
    width: '100%'
  }),
  bar: theme => ({
    background: theme.progress.bar,
    display: 'block',
    height: '100%',
    transition: 'width .5s'
  }),
  barUnsaved: theme => ({
    background: theme.unsaved
  }),
  caption: theme => ({
    alignItems: 'center',
    color: theme.color,
    display: 'flex',
    fontSize: 12,
    fontWeight: 'normal',
    height: 16,
    margin: {
      top: 4
    },
    width: '100%'
  }),
  unsaved: theme => ({
    color: theme.unsaved
  }),
  value: {
    flex: {
      grow: 1
    }
  },
  limit: theme => ({
    color: theme.colorUnimportant,
    fontStyle: 'italic'
  }),
  percent: {
    flex: {
      basis: 40
    },
    textAlign: 'right'
  }
};