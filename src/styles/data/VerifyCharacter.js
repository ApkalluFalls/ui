import formStyles from 'styles/forms';
import textStyles from 'styles/text';

export default {
  ...formStyles(),
  ...textStyles,
  heading: theme => ({
    fontSize: 16,
    margin: {
      bottom: 8,
      top: 0
    }
  }),
  code: theme => ({
    borderBottom: {
      color: theme.verificationCode,
      style: 'dotted',
      width: 1
    },
    color: theme.verificationCode,
    display: 'inline-block',
    fontFamily: 'monospace',
    fontStyle: 'italic',
    margin: {
      left: 4,
      right: 16,
      top: 4
    },
    padding: '4px 8px'
  }),
  codeCopyOnClick: theme => ({
    cursor: 'copy'
  }),
  copyHelper: theme => ({
    color: theme.colorUnimportant,
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: '16px',
    opacity: 0,
    transition: 'opacity .4s',
    userSelect: 'none'
  }),
  copyHelperCopied: theme => ({
    opacity: 1
  })
}