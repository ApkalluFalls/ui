export default {
  characterCard: theme => ({
    alignItems: 'center',
    background: theme.characterCard.background,
    boxShadow: {
      blur: 2,
      color: theme.shadow,
      x: 1,
      y: 1
    },
    boxSizing: 'border-box',
    display: 'inline-flex',
    flex: {
      basis: 'calc(50% - 16px)',
      shrink: 0
    },
    height: 48,
    margin: 8,
    overflow: 'hidden',
    width: 256,

    '&:hover, &:focus': {
      background: theme.characterCard.backgroundHover
    },

    '&:nth-child(odd)': {
      marginRight: 0
    }
  }),
  avatar: {
    background: {
      size: 'cover'
    },
    border: {
      radius: '100%'
    },
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    height: 56,
    flex: {
      basis: 56,
      shrink: 0
    },
    marginRight: 8
  },
  name: theme => ({
    color: theme.characterCard.color,
    display: 'block',
    flex: {
      grow: 1
    }
  }),
  server: theme => ({
    color: theme.colorUnimportant,
    display: 'block',
    fontSize: 14,
    lineHeight: '17px'
  })
}