import Background from 'images/background2.png';
import Logo from 'images/apkallu.png';

export const navigation = {
  width: 192
}

export default {
  navigation: {
    background: {
      color: '#f2f2f2',
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
    background: 'linear-gradient(to right, rgba(242, 242, 242, 0.8) 0%, rgba(234, 234, 234, 1) 100%)',
    boxSizing: 'border-box',
    fallbacks: [
      { background: '-moz-linear-gradient(left, rgba(242, 242, 242, 0.8) 0%, rgba(234, 234, 234, 1) 100%)' },
      { background: '-webkit-linear-gradient(left, rgba(242, 242, 242, 0.8) 0%, rgba(234, 234, 234, 1) 100%)' }
    ],
    height: '100%',
    padding: 12,
    width: navigation.width
  },
  header: {
    alignItems: 'center',
    color: '#333',
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    height: 48,
    justifyContent: 'center',
    textShadow: {
      blur: 1,
      color: '#fff',
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
      color: '#757575'
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
    color: '#4E53B1',
    display: 'block',
    margin: {
      top: 4
    },
    padding: 8,
    textDecoration: 'none',
    transition: 'color .2s',

    '&:hover, &:focus': {
      '& h2': {
        color: '#1E2485',
        textDecoration: 'underline'
      }
    }
  },
  linkActive: {
    background: '#eaeaea',
    boxShadow: {
      x: 0,
      y: 0,
      blur: 8,
      color: '#eaeaea',
      spread: 4
    },
    color: '#333',
    fontWeight: 'bold',
    overflow: 'hidden',

    '& h2': {
      fontWeight: 'bold'
    },

    '&:hover, &:focus': {
      cursor: 'default',

      '& h2': {
        color: '#333',
        fontWeight: 'bold',
        textDecoration: 'none'
      }
    }
  }
};