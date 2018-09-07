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
    display: 'inline-block',
    height: local.header.logoSize,
    marginRight: 10,
    verticalAlign: 'top',
    width: local.header.logoSize
  },
  title: {
    display: 'inline-block',
    margin: 0
  },
  links: {
    background: theme.navigation.background,
    height: `calc(100% - ${local.header.height}px)`
  }
});