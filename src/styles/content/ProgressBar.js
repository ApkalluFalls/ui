export default theme => {
  const { progress: progressTheme } = theme;

  return {
    progress: {
      background: progressTheme.background,
      display: 'block',
      height: 2,
      overflow: 'hidden',
      width: '100%'
    },
    bar: {
      background: progressTheme.bar,
      display: 'block',
      height: '100%'
    },
    caption: {
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
  };
}