export default (theme) => {
  const { form: formTheme } = theme;

  return {
    wrapper: {
      height: 60,
      position: 'fixed',
        bottom: 12,
        right: 12,
      width: 60,
      zIndex: 9
    },
    userBox: {
      alignItems: 'center',
      background: {
        color: theme.color,
        repeat: 'no-repeat',
        size: 'cover'
      },
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
      transition: 'opacity .2s',
      width: 60,

      '&:hover, &:focus': {
        opacity: 1
      },

      '& > *': {
        color: theme.brand
      }
    },
    pageActive: {
      cursor: 'default',
      opacity: 1,
      pointerEvents: 'none',
    },
    userBoxAnonymous: {
      background: theme.brand,
      borderColor: theme.brandDarker,

      '& > *': {
        color: theme.color
      }
    },
    userBoxLoading: {
      background: 'transparent',
      borderColor: 'transparent',

      '& > *': {
        color: theme.colorUnimportant
      }
    },
    icon: {
      fontSize: 24
    }
  };
}