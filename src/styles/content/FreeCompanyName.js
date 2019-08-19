import textStyles from 'styles/text';

export default {
  ...textStyles,
  freeCompanyName: {
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
    display: 'inline-block',
    flex: {
      basis: 16,
      grow: 0,
      shrink: 0
    },
    height: 16,
    marginRight: 4,
    position: 'relative'
  },
  iconPart: {
    backgroundSize: 'cover',
    display: 'block',
    height: '100%',
    position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    width: '100%'
  },
  name: {
    flex: {
      grow: 1,
      shrink: 0
    }
  },
  tag: theme => ({
    color: theme.colorUnimportant,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: '17px'
  })
}