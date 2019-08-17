import brandStyles from 'styles/brands';
import formStyles from 'styles/forms';

export default {
  ...formStyles(),
  loader: theme => ({
    alignItems: 'center',
    boxSizing: 'border-box',
    color: theme.colorMid,
    display: 'flex',
    flexWrap: 'wrap',
    height: '4vh',
    margin: {
      bottom: 0,
      left: 'auto',
      right: 'auto',
      top: '46vh',
    },
    maxWidth: 512,
    padding: 0,
    width: '50%'
  }),
  caption: theme => ({
    color: theme.colorSubtle,
    display: 'block',
    fontSize: 20,
    fontWeight: 'normal',
    margin: '0 0 8px',
    padding: 0,
    flex: {
      basis: '100%',
      shrink: 0
    }
  }),
  iconOnly: {
    fontSize: 96
  },
  help: theme => ({
    color: theme.colorUnimportant,
    fontSize: 16
  }),
  discord: theme => ({
    background: brandStyles.discord,
    borderColor: brandStyles.discordAlt,
    color: '#fff',

    '&:hover, &:focus, &:active': {
      background: brandStyles.discordAlt
    }
  })
}