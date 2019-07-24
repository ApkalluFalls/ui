export default {
  '@global': {
    'html, body': {
      background: '#eaeaea',
      color: '#333',
      fontFamily: `'PT Sans', sans-serif`
    },

    'h1': {
      margin: {
        bottom: 8,
        top: 0
      }
    },

    'p': {
      margin: {
        bottom: 8,
        top: 0
      }
    },

    'a, a:visited': {
      color: '#4E53B1',
      textDecoration: 'none',

      '&:hover, &:focus': {
        color: '#1E2485'
      },

      '&:active': {
        color: '#760E7D'
      }
    }
  }
}