import Background from 'images/background-new.jpg';
import Logo from 'images/apkallu.png';

export const navigation = {
  width: 192
}

export default {
  backdrop: {
    background: {
      color: '#333',
      image: `url(${Background})`,
      position: '-76px 0',
      repeat: 'no-repeat'
    },
    borderRight: {
      color: '#333',
      style: 'solid',
      width: 1
    },
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      spread: null,
      color: '#333'
    },
    boxSizing: 'border-box',
    height: '100%',
    position: 'fixed',
      left: 0,
      top: 0,
    width: navigation.width,
    zIndex: 1
  },
  navigation: {
    background: 'rgba(0,0,0,0.6)',
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    width: '100%'
  },
  header: {
    alignItems: 'center',
    color: '#ffef58',
    display: 'flex',
    fontSize: 20,
    fontWeight: 'bold',
    height: 48,
    justifyContent: 'center',
    width: '100%'
  },
  logo: {
    background: {
      image: `url(${Logo})`,
      size: 'cover'
    },
    display: 'block',
    height: 32,
    marginRight: 10,
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
    borderBottom: {
      color: 'rgba(255, 240, 87, 0.15)',
      style: 'solid',
      width: 1
    },
    color: '#fff',
    display: 'block',
    padding: '8px 16px',
    textDecoration: 'none',
    transition: '.2s',

    '&:first-child': {
      borderTop: {
        color: 'rgba(255, 240, 87, 0.15)',
        style: 'solid',
        width: 1
      }
    },

    '&:hover, &:focus': {
      background: 'rgba(255, 240, 87, 0.1)'
    }
  },
  linkActive: {
    background: 'rgba(0, 0, 0, 0.6)',

    '&:hover, &:focus': {
      background: 'rgba(0, 0, 0, 0.6)'
    }
  }
};