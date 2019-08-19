import textStyles from 'styles/text';
import CharacterBackground from 'images/character-background.png';

export default {
  ...textStyles,
  header: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 16,
    width: '100%'
  },
  crest: theme => ({
    backgroundImage: `url(${CharacterBackground})`,
    backgroundSize: 'cover',
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
    marginRight: 16,
    position: 'relative'
  }),
  crestPart: {
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
  details: {
    flex: {
      grow: 1
    }
  },
  actions: {
    textAlign: 'right'
  },
  name: {
    fontSize: 24,
    lineHeight: '27px',
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
  sectionHeading: theme => ({
    color: theme.colorSubtle,
    fontSize: 14,
    lineHeight: '17px',
    margin: '0 0 4px'
  }),
  infoBlock: theme => ({
    color: theme.colorUnimportant,
    fontSize: 14,
    lineHeight: '17px',
    margin: 0,
    padding: 0
  }),
  slogan: theme => ({
    color: theme.colorUnimportant,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: '17px',
    margin: 0,
    padding: 0
  }),
  infoBlockIcon: theme => ({
    color: theme.colorUnimportant,
    fontSize: 12,
    lineHeight: '15px',
    marginRight: 8,
    verticalAlign: 'top',
    width: 16
  }),
  sectionSeparate: theme => ({
    borderTop: {
      color: theme.border,
      style: 'dotted',
      width: 1
    },
    marginTop: 64,
    paddingTop: 16
  }),
  memberRank: theme => ({
    borderBottom: {
      color: theme.border,
      style: 'dotted',
      width: 1
    },
    marginBottom: 16,
    paddingBottom: 16,

    '&:last-child': {
      borderBottom: 0,
      marginBottom: 0,
      paddingBottom: 0
    }
  }),
  memberRankHeading: {
    alignItems: 'center',
    display: 'flex'
  },
  memberRankIcon: {
    backgroundSize: 'cover',
    flex: {
      basis: 24,
      grow: 0,
      shrink: 0
    },
    height: 24,
    marginRight: 8
  },
  memberRankName: theme => ({
    color: theme.colorSubtle,
    flex: {
      grow: 1
    },
    fontSize: 18,
    lineHeight: '21px',
    margin: 0
  })
};