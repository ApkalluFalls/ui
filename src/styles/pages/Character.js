import formStyles from 'styles/forms';
import textStyles from 'styles/text';
import CharacterBackground from 'images/character-background.png';

export default {
  ...formStyles(),
  ...textStyles,
  header: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 16,
    width: '100%'
  },
  avatar: theme => ({
    backgroundImage: `url(${CharacterBackground})`,
    backgroundSize: 'cover',
    borderRadius: '100%',
    boxShadow: {
      x: 0,
      y: 1,
      blur: 2,
      color: theme.shadow
    },
    flex: {
      basis: 56,
      shrink: 0
    },
    height: 56,
    marginRight: 16
  }),
  details: {
    flex: {
      grow: 1
    }
  },
  actions: {
    textAlign: 'right'
  },
  freeCompanyTag: theme => ({
    color: theme.colorSubtle,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '19px'
  }),
  name: {
    fontSize: 24,
    marginBottom: 0
  },
  tagline: theme => ({
    color: theme.colorUnimportant,
    marginBottom: 0
  }),
  section: {
    marginBottom: 16,
    padding: {
      bottom: 4,
      left: 16,
      right: 16,
      top: 4
    }
  },
  bioHeading: theme => ({
    color: theme.colorSubtle,
    fontSize: 14,
    lineHeight: '17px',
    margin: '0 0 4px'
  }),
  bio: theme => ({
    color: theme.colorUnimportant,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: '17px',
    margin: 0,
    padding: 0
  }),
  bioQuoteIcon: theme => ({
    color: theme.border,
    fontSize: 12,
    lineHeight: '15px',
    marginRight: 8,
    verticalAlign: 'top'
  }),
  sectionSeparate: theme => ({
    borderTop: {
      color: theme.border,
      style: 'dotted',
      width: 1
    },
    marginTop: 64,
    paddingTop: 16
  })
};