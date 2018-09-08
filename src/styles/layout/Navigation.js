import Background from 'images/background.jpg';
import Logo from 'images/apkallu.png';

const local = {
  height: 192,
  header: {
    height: 60,
    logoSize: 40
  }
}

export default theme => ({
  navigation: {
    background: {
      color: theme.navigation.background,
      image: `url(${Background})`,
      position: 0,
      repeat: 'no-repeat'
    },
    height: '100%',
    position: 'absolute',
      left: 0,
      top: 0,
    width: local.height,
    zIndex: 1
  },
  header: {
    background: theme.navigation.background,
    boxSizing: 'border-box',
    color: theme.brand,
    display: 'block',
    lineHeight: '40px',
    height: local.header.height,
    padding: 10
  },
  logo: {
    background: {
      image: `url(${Logo})`,
      size: 'contain'
    },
    borderRadius: '100%',
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      spread: null,
      color: theme.navigation.logo.shadow
    },
    display: 'inline-block',
    height: local.header.logoSize,
    marginRight: 10,
    verticalAlign: 'top',
    width: local.header.logoSize
  },
  title: {
    display: 'inline-block',
    margin: 0,
    textShadow: {
      x: 0,
      y: 1,
      color: theme.navigation.logo.shadow
    }
  },
  links: {
    background: theme.navigation.background,
    height: `calc(100% - ${local.header.height}px)`
  },
  linksList: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  linksListItem: {
    borderBottom: {
      color: theme.navigation.link.border,
      style: 'solid',
      width: 1
    },
    '&:first-child': {
      borderTop: {
        color: theme.navigation.link.border,
        style: 'solid',
        width: 1
      }
    }
  },
  link: {
    color: theme.navigation.link.color,
    display: 'flex',
    padding: 6,
    '&:hover, &:focus': {
      background: theme.navigation.link.hoverBackground,
      color: theme.navigation.link.color,
      textDecoration: 'none'
    }
  },
  linkIcon: {
    flex: '0 0 32px',
    marginRight: 6,
    textAlign: 'center'
  },
  linkText: {
    flexGrow: 1
  }
});