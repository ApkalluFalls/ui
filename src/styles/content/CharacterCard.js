import CharacterBackground from 'images/character-background.png';

export default theme => ({
  characterCard: {
    alignItems: 'center',
    boxShadow: {
      blur: 2,
      color: theme.shadow,
      x: 1,
      y: 1
    },
    color: theme.color,
    display: 'inline-flex',
    margin: 8,
    width: 256
  },
  avatar: {
    background: {
      size: 'cover'
    },
    height: 48,
    flex: {
      basis: 48,
      shrink: 0
    },
    marginRight: 8
  },
  name: {
    display: 'block',
    flex: {
      grow: 1
    }
  },
  server: {
    color: theme.colorUnimportant,
    display: 'block',
    fontSize: 14,
    lineHeight: '17px'
  }
});