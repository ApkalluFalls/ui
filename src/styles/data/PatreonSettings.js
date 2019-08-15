import brandStyles from '../brands';
import formStyles from '../forms';

export default (theme) => {
  const { form: formTheme } = theme;

  return {
    ...formStyles(theme),
    connectButton: {
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
    }
  };
}