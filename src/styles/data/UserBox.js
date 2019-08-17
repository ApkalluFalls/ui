export default () => {
  const verifiedCharacterStyle = {
    height: 40,
    marginBottom: 4,
    width: 40
  };

  const linkEffects = theme => ({
    boxShadow: {
      blur: 2,
      color: theme.shadow,
      x: 1,
      y: 1
    },
    opacity: 0.7,
    transition: 'opacity .2s',

    '&:hover, &:focus': {
      opacity: 1
    }
  });

  return {
    wrapper: {
      height: 60,
      position: 'fixed',
        bottom: 12,
        right: 12,
      width: 60,
      zIndex: 9
    },
    userBox: theme => ({
      ...linkEffects(theme),
      alignItems: 'center',
      backgroundColor: theme.color,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: '100%',
      boxSizing: 'border-box',
      color: theme.brand,
      display: 'flex',
      height: 60,
      justifyContent: 'center',
      width: 60,

      '& > *': {
        color: theme.brand
      }
    }),
    pageActive: () => ({
      cursor: 'default',
      opacity: 1,
      pointerEvents: 'none',
    }),
    userBoxAnonymous: theme => ({
      background: theme.brand,

      '& > *': {
        color: theme.brandColor
      }
    }),
    userBoxLoading: theme => ({
      background: 'transparent',
      borderColor: 'transparent',

      '& > *': {
        color: theme.colorUnimportant
      }
    }),
    icon: {
      fontSize: 24
    },
    verifiedCharacters: theme => {
      const {
        verifiedCharacters = []
      } = theme.componentProps;

      return {
        height: (
          (verifiedCharacters.length * verifiedCharacterStyle.height)
          + ((verifiedCharacters.length - 1) * verifiedCharacterStyle.marginBottom)
        ),
        marginBottom: 4,
        position: 'absolute',
          bottom: '100%',
          right: 0,
        transition: 'height .2s'
      }
    },
    verifiedCharacter: theme => ({
      ...linkEffects(theme),
      ...verifiedCharacterStyle,
      backgroundSize: 'cover',
      borderRadius: '100%',
      display: 'block',

      '&:nth-last-child(even)': {
        marginLeft: -8
      },

      '&:nth-last-child(odd)': {
        marginRight: -4
      }
    })
  }
}