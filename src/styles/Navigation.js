import brandStyles from 'styles/brands';
import Background from 'images/background2.png';
import Logo from 'images/apkallu.png';

export const navigation = {
  linkActive: theme => ({
    background: theme.background,
    boxShadow: {
      x: 0,
      y: 0,
      blur: 8,
      color: theme.background,
      spread: 4
    },
    color: theme.color,
    cursor: 'default',
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
  }),
  linkArrow: theme => ({
    border: {
      color: 'transparent',
      style: 'solid',
      width: '18px 0 18px 10px'
    },
    content: '""',
    height: 0,
    opacity: 0.8,
    position: 'absolute',
      left: -12,
      top: 'calc(50% - 18px)',
    transition: '.2s',
    width: 0,
    zIndex: 2
  }),
  linkHoverFocus: theme => ({
    background: theme.background,
    boxShadow: {
      x: 0,
      y: 0,
      blur: 16,
      color: theme.background,
      spread: 8
    },

    '& h2': {
      color: theme.linkHoverFocus
    },

    '&::before': {
      borderLeftColor: theme.link
    }
  }),
  width: 204
}

export default () => {
  return {
    navigation: theme => ({
      backgroundColor: theme.background,
      backgroundImage: `url(${Background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto 100%',
      display: 'block',
      height: '100%',
      position: 'fixed',
        left: 0,
        top: 0,
      width: navigation.width,
      zIndex: 1
    }),
    wrapper: theme => ({
      background: `linear-gradient(to right, ${theme.navigation.gradientStart} 0%, ${theme.navigation.gradientEnd} 80%)`,
      boxSizing: 'border-box',
      fallbacks: [
        { background: `-moz-linear-gradient(left, ${theme.navigation.gradientStart} 0%, ${theme.navigation.gradientEnd} 80%)` },
        { background: `-webkit-linear-gradient(left, ${theme.navigation.gradientStart} 0%, ${theme.navigation.gradientEnd} 80%)` }
      ],
      height: '100%',
      padding: 12,
      width: navigation.width
    }),
    header: theme => ({
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
    }),
    logo: theme => ({
      backgroundImage: `url(${Logo})`,
      backgroundSize: 'cover',
      boxShadow: {
        x: 0,
        y: 1,
        blur: 2,
        color: theme.shadow
      },
      display: 'block',
      height: 32,
      marginRight: 12,
      width: 32,
      zIndex: 2
    }),
    character: {
      position: 'relative',
      zIndex: 2
    },
    links: {
      boxSizing: 'border-box',
      display: 'block',
      height: 'calc(100% - 224px)',
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    linkItem: {
      display: 'block'
    },
    link: theme => ({
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
        ...navigation.linkArrow(theme)
      },

      '&:hover, &:focus': {
        ...navigation.linkHoverFocus(theme)
      },

      '&:active': {
        ...navigation.linkActive(theme)
      }
    }),
    linkCollapsed: () => ({
      '&::before': {
        borderWidth: '18px 0 18px 10px'
      }
    }),
    linkActive: theme => ({
      ...navigation.linkActive(theme)
    }),
    options: {
      display: 'block',
      margin: {
        bottom: 12,
        top: 12
      },
      position: 'absolute',
        bottom: 0,
      width: navigation.width - 24
    },
    label: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      fontSize: 14,
      lineHeight: '17px',
      width: '100%'
    },
    control: {
      marginRight: 4
    },
    labelText: {
      flex: {
        grow: 1
      }
    },
    labelTextInfo: theme => ({
      color: theme.colorSubtle,
      fontSize: 12
    }),
    externalLink: theme => ({
      border: {
        radius: 4
      },
      boxShadow: {
        x: 0,
        y: 1,
        blur: 2,
        color: theme.shadow
      },
      color: '#fff',
      display: 'block',
      fontSize: 14,
      marginTop: 4,
      opacity: 0.7,
      padding: {
        bottom: 4,
        left: 8,
        right: 8,
        top: 4
      },
      textAlign: 'center',
      transition: 'background .1s, opacity .1s'
    }),
    discord: theme => ({
      background: brandStyles.discord,
      borderColor: brandStyles.discordAlt,

      '&:hover, &:focus, &:active': {
        background: brandStyles.discordAlt,
        color: '#fff',
        opacity: 1
      }
    }),
    patreon: theme => ({
      background: brandStyles.patreon,
      borderColor: brandStyles.patreonAlt,

      '&:hover, &:focus, &:active': {
        background: brandStyles.patreonAlt,
        color: '#fff',
        opacity: 1
      }
    })
  }
}