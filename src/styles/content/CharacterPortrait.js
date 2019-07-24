import CharacterBackground from 'images/character-background.png';

export default {
  container: {
    margin: {
      bottom: 12,
      top: 12
    }
  },
  character: {
    alignItems: 'center',
    display: 'flex',
    height: 48,
    margin: 0,
    padding: 0
  },
  imageWrapper: {
    alignSelf: 'flex-start',
    flex: {
      basis: 48
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
      color: '#333',
      x: 1,
      y: 1
    },
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'block',
    fontSize: 32,
    height: 48,
    lineHeight: '48px',
    textAlign: 'center',
    width: 48
  },
  caption: {
    flex: {
      grow: 1
    }
  },
  captionNoCharacterSelected: {
    color: '#4E53B1',
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: '16px'
  }
}