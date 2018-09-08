const local = {
  progressBarHeight: 4
};

export default (theme, source) => {  
  if (!source)
    return {
      progress: {
        margin: 0
      },
      caption: {
        fontSize: 14,
        marginBottom: local.progressBarHeight
      },
      wrapper: {
        background: theme.progressBar.background,
        boxShadow: {
          x: 2,
          y: 2,
          blur: 2,
          spread: null,
          color: theme.progressBar.shadow
        },
        height: local.progressBarHeight,
        marginBottom: local.progressBarHeight
      },
      bar: {
        background: theme.progressBar.foreground,
        color: 'transparent',
        display: 'block',
        fontSize: 0,
        height: local.progressBarHeight
      },
      textWrapper: {
        display: 'flex',
        fontSize: 12,
        width: '100%'
      },
      count: {
        flexGrow: 1
      },
      percentage: {
        textAlign: 'right'
      }
    };

  if (source === 'navigation')
    return {
      progress: {
        margin: 0
      },
      caption: {
        color: theme.navigation.color,
        fontSize: 17,
        marginBottom: local.progressBarHeight / 2
      },
      wrapper: {
        background: theme.navigation.progress.background,
        height: local.progressBarHeight / 2,
        marginBottom: local.progressBarHeight / 2
      },
      bar: {
        background: theme.brand,
        borderRight: {
          color: theme.navigation.progress.border,
          style: 'solid',
          width: 1
        },
        boxSizing: 'border-box',
        color: 'transparent',
        display: 'block',
        fontSize: 0,
        height: local.progressBarHeight / 2
      },
      textWrapper: {
        color: theme.navigation.progress.color,
        display: 'flex',
        fontSize: 11,
        width: '100%'
      },
      count: {
        flexGrow: 1
      },
      percentage: {
        textAlign: 'right'
      }
    };
}