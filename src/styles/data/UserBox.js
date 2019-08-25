export default () => {
  const userBoxAvatar = {
    height: 60,
    width: 60,
    zIndex: 9
  }

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
    filter: 'grayscale(1)',
    transition: 'box-shadow .2s, filter .2s',

    '&:hover, &:focus': {
      filter: 'grayscale(0)',
    }
  });

  return {
    wrapper: {
      height: userBoxAvatar.height,
      position: 'fixed',
        bottom: 12,
        right: 12,
      width: userBoxAvatar.width,
      zIndex: userBoxAvatar.zIndex
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
      height: userBoxAvatar.height,
      justifyContent: 'center',
      position: 'relative',
      width: userBoxAvatar.width,
      zIndex: userBoxAvatar.zIndex,

      '& > *': {
        color: theme.brand
      }
    }),
    userBoxUnsavedChanges: theme => ({
      boxShadow: {
        blur: 1,
        color: theme.unsaved,
        spread: 3,
        x: 0,
        y: 0
      }
    }),
    pageActive: () => ({
      cursor: 'default',
      filter: 'grayscale(0)',
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
    }),
    unsavedChanges: theme => ({
      background: theme.unsaved,
      borderRadius: 4,
      boxShadow: {
        blur: 2,
        color: theme.shadow,
        x: 1,
        y: 1
      },
      color: theme.unsavedColor,
      cursor: 'pointer',
      display: 'block',
      fontSize: 14,
      lineHeight: '17px',
      height: 28,
      opacity: 0.6,
      overflow: 'hidden',
      paddingRight: userBoxAvatar.width / 2,
      position: 'absolute',
        bottom: (userBoxAvatar.height - 28) / 2,
        right: userBoxAvatar.width / 2,
      transition: 'opacity .1s, padding .1s, width .2s',
      width: 80,
      zIndex: userBoxAvatar.zIndex - 1,

      '&:hover, &:focus': {
        opacity: 1
      }
    }),
    unsavedChangesCollapsed: () => ({
      padding: 0,
      width: 0
    }),
    unsavedChangesButton: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      width: '100%'
    },
    unsavedChangesText: {
      marginLeft: 8
    },
    savingChanges: () => ({
      cursor: 'default',
      opacity: 1,
      pointerEvents: 'none',
      width: 108
    })
  }
}