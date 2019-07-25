import Background from 'images/background2.png';
import Logo from 'images/apkallu.png';

export const navigation = {
  width: 204
}

export default theme => {
  const { navigation: navigationTheme } = theme;

  return {
  navigation: {
    background: {
      color: theme.background,
      image: `url(${Background})`,
      repeat: 'no-repeat',
      size: 'auto 100%'
    },
    display: 'block',
    height: '100%',
    position: 'fixed',
      left: 0,
      top: 0,
    width: navigation.width,
    zIndex: 1
  },
  wrapper: {
    background: `linear-gradient(to right, ${navigationTheme.gradientStart} 0%, ${navigationTheme.gradientEnd} 80%)`,
    boxSizing: 'border-box',
    fallbacks: [
      { background: `-moz-linear-gradient(left, ${navigationTheme.gradientStart} 0%, ${navigationTheme.gradientEnd} 80%)` },
      { background: `-webkit-linear-gradient(left, ${navigationTheme.gradientStart} 0%, ${navigationTheme.gradientEnd} 80%)` }
    ],
    height: '100%',
    padding: 12,
    width: navigation.width
  },
  header: {
    alignItems: 'center',
    color: theme.color,
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    height: 48,
    justifyContent: 'center',
    textShadow: {
      blur: 1,
      color: theme.textShadow,
      x: 1,
      y: 1
    },
    width: '100%'
  },
  logo: {
    background: {
      image: `url(${Logo})`,
      size: 'cover'
    },
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      color: theme.shadow
    },
    display: 'block',
    height: 32,
    marginRight: 12,
    width: 32
  },
  links: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  linkItem: {
    display: 'block'
  },
  link: {
    background: 'transparent',
    boxSizing: 'border-box',
    color: theme.link,
    display: 'block',
    margin: {
      top: 4
    },
    padding: 8,
    position: 'relative',
    textDecoration: 'none',
    transition: 'color .2s',

    '&::before': {
      border: {
        color: 'transparent',
        style: 'solid',
        width: '29px 0 29px 8px'
      },
      content: '""',
      height: 0,
      opacity: 0.8,
      position: 'absolute',
        bottom: 0,
        left: -12,
        top: 0,
      transition: '.2s',
      width: 0,
      zIndex: 2
    },

    '&:hover, &:focus': {
      '& h2': {
        color: theme.linkHoverFocus,
        textDecoration: 'underline'
      },

      '&::before': {
        borderLeftColor: theme.link
      }
    }
  },
  linkActive: {
    background: theme.background,
    boxShadow: {
      x: 0,
      y: 0,
      blur: 8,
      color: theme.background,
      spread: 4
    },
    color: theme.color,
    fontWeight: 'bold',

    '& h2': {
      fontWeight: 'bold'
    },

    '&::before': {
      borderLeftColor: theme.color,
    },

    '&:hover, &:focus': {
      cursor: 'default',

      '& h2': {
        color: theme.color,
        fontWeight: 'bold',
        textDecoration: 'none'
      },

      '&::before': {
        borderLeftColor: theme.color
      }
    }
  }
};
}