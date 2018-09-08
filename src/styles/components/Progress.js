const local = {
  progressBarHeight: 4
};

export default theme => ({
  progress: {
    margin: 0
  },
  caption: props => {
    if (props.source === 'navigation')
      return {
        color: theme.navigation.color,
        fontSize: 17,
        marginBottom: local.progressBarHeight / 2
      };

    return {
      fontSize: 14,
      marginBottom: local.progressBarHeight
    };
  },
  wrapper: props => {
    if (props.source === 'navigation')
      return {
        background: theme.navigation.progress.background,
        height: local.progressBarHeight / 2,
        marginBottom: local.progressBarHeight / 2
      };

    return {
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
    };
  },
  bar: props => {
    const style = {
      color: 'transparent',
      display: 'block',
      fontSize: 0,
    };

    if (props.source === 'navigation') {
      style.background = theme.brand;
      style.borderRight = {
        color: theme.navigation.progress.border,
        style: 'solid',
        width: 1
      };
      style.boxSizing = 'border-box';
      style.height = local.progressBarHeight / 2;
    } else {
      style.background = theme.progressBar.foreground;
      style.height = local.progressBarHeight;
    }

    return style;
  },
  textWrapper: props => {
    const style = {
      display: 'flex',
      width: '100%'
    };

    if (props.source === 'navigation') {
      style.color = theme.navigation.progress.color;
      style.fontSize = 11;
    } else {
      style.fontSize = 12;
    }

    return style;
  },
  count: {
    flexGrow: 1
  },
  percentage: {
    textAlign: 'right'
  }
});  