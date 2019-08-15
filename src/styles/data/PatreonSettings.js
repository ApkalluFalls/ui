import brandStyles from '../brands';
import formStyles from '../forms';

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