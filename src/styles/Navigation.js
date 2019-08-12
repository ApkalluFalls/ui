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
          width: '29px 0 29px 10px'
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
      }
    },
    linkCollapsed: {
      '&::before': {
        borderWidth: '18px 0 18px 10px'
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
    },
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
    labelTextInfo: {
      color: theme.colorSubtle,
      fontSize: 12
    },
    externalLink: {
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
      padding: {
        bottom: 4,
        left: 8,
        right: 8,
        top: 4
      },
      textAlign: 'center',
      transition: 'background .2s'
    },
    discord: {
      background: navigationTheme.discord,

      '&:hover, &:focus': {
        background: navigationTheme.discordHover,
        color: '#fff'
      }
    },
    patreon: {
      background: navigationTheme.patreon,

      '&:hover, &:focus': {
        background: navigationTheme.patreonHover,
        color: '#fff'
      }
    }
  };
}