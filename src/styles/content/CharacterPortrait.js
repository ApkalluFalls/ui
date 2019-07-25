import CharacterBackground from 'images/character-background.png';

export default theme => ({
  container: {
    margin: {
      bottom: 12,
      top: 12
    },
    position: 'relative'
  },
  character: {
    alignItems: 'center',
    display: 'flex',
    height: 60,
    margin: 0,
    padding: 0
  },
  imageWrapper: {
    alignSelf: 'flex-start',
    flex: {
      basis: 60
    },
    marginRight: 12
  },
  image: {
    background: {
      image: `url(${CharacterBackground})`,
      repeat: 'no-repeat',
      size: '100%'
    },
    borderRadius: '4px',
    boxShadow: {
      blur: 2,
      color: theme.shadow,
      x: 1,
      y: 1
    },
    boxSizing: 'border-box',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'block',
    fontSize: 40,
    height: 60,
    lineHeight: '56px',
    paddingTop: 4,
    textAlign: 'center',
    width: 60
  },
  caption: {
    alignSelf: 'flex-start',
    color: theme.color,
    flex: {
      grow: 1
    },
    fontSize: 16,
    lineHeight: '19px'
  },
  captionNoCharacterSelected: {
    alignSelf: 'center',
    color: theme.link,
    fontSize: 13,
    lineHeight: '16px'
  },
  changeCharacter: {
    display: 'block',
    fontSize: 13,
    lineHeight: '16px',
    position: 'absolute',
      bottom: 0,
      left: 72
  }
});