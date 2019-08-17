import brandStyles from 'styles/brands';
import formStyles from 'styles/forms';

export default {
  ...formStyles(),
  connectButton: () => ({
    background: brandStyles.patreon,
    border: {
      color: brandStyles.patreonAlt,
      style: 'solid',
      width: 1
    },
    color: '#fff',

    '&:hover, &:focus': {
      background: brandStyles.patreonAlt
    }
  })
}