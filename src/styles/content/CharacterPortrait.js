import CharacterBackground from 'images/character-background.png';
import { navigation } from 'styles/Navigation';

export default {
  container: {
    margin: {
      bottom: 4,
      top: 4
    },
    position: 'relative'
  },
  link: theme => ({
    display: 'block',
    padding: '8px 0',

    '&::before': {
      ...navigation.linkArrow(theme)
    },

    '&:hover, &:focus': {
      ...navigation.linkHoverFocus(theme)
    },
  }),
  linkActive: theme => ({
    ...navigation.linkActive(theme),

    '&:hover, &:focus': {
      ...navigation.linkActive(theme)
    }
  }),
  character: {
    alignItems: 'center',
    display: 'flex',
    fontWeight: 'normal',
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
  image: theme => ({
    backgroundImage: `url(${CharacterBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
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
  }),
  caption: theme => ({
    alignSelf: 'flex-start',
    color: theme.color,
    flex: {
      grow: 1
    },
    fontSize: 16,
    lineHeight: '19px'
  }),
  captionNoCharacterSelected: theme => ({
    alignSelf: 'center',
    color: theme.link,
    fontSize: 13,
    lineHeight: '16px'
  }),
  captionCharacterLoading: theme => ({
    alignSelf: 'center',
    color: theme.colorUnimportant,
    fontSize: 13,
    lineHeight: '16px'
  }),
  changeCharacter: {
    display: 'block',
    fontSize: 13,
    lineHeight: '16px',
    position: 'absolute',
      bottom: 8,
      left: 72
  }
};