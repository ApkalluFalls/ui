import Chinese from 'images/language/chinese.png';
import English from 'images/language/english.png';
import French from 'images/language/french.png';
import German from 'images/language/german.png';
import Japanese from 'images/language/japanese.png';
import Korean from 'images/language/korean.png';

export default theme => ({
  language: {
    display: 'inline-flex',
    marginBottom: 10
  },
  link: {
    background: {
      position: 0,
      repeat: 'no-repeat',
      size: 'contain'
    },
    borderRadius: '100%',
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      spread: null,
      color: theme.shadow
    },
    display: 'block',
    filter: 'grayscale(0.7)',
    height: 40,
    marginRight: 8,
    width: 40,
    '&:hover, &:focus': {
      filter: 'grayscale(0.3)'
    },
    '&:last-child': {
      marginRight: 0
    }
  },
  en: {
    backgroundImage: `url(${English})`
  },
  de: {
    backgroundImage: `url(${German})`
  },
  fr: {
    backgroundImage: `url(${French})`
  },
  ja: {
    backgroundImage: `url(${Japanese})`
  },
  cn: {
    backgroundImage: `url(${Chinese})`
  },
  ko: {
    backgroundImage: `url(${Korean})`
  },
  active: {
    cursor: 'default',
    filter: 'grayscale(0)'
  },
  disabled: {
    cursor: 'not-allowed',
    filter: 'grayscale(1)',
    opacity: 0.25
  }
});