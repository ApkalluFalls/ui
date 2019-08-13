export default (theme) => {
  const { form: formTheme } = theme;

  return {
    userBox: {
      alignItems: 'center',
      background: theme.color,
      border: {
        color: theme.color,
        radius: '100%',
        style: 'solid',
        width: 1
      },
      boxSizing: 'border-box',
      color: theme.brand,
      display: 'flex',
      height: 60,
      justifyContent: 'center',
      opacity: 0.7,
      position: 'fixed',
        bottom: 12,
        right: 12,
      transition: 'opacity .2s',
      width: 60,
      zIndex: 9,

      '&:hover, &:focus': {
        opacity: 1
      }
    },
    userBoxAnonymous: {
      background: theme.brand,
      borderColor: theme.brandDarker,

      '& > *': {
        color: theme.color
      }
    },
    icon: {
      fontSize: 24
    }
  };
}