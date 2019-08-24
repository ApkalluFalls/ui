import brandStyles from 'styles/brands';
import formStyles from 'styles/forms';
import textStyles from 'styles/text';

export default {
  ...formStyles(),
  ...textStyles,
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
    },

    '&:disabled': {
      background: brandStyles.patreon
    }
  })
}