import formStyles from 'styles/forms';
import textStyles from 'styles/text';

export default {
  ...formStyles(),
  ...textStyles,
  verifyCharacter: theme => ({
    background: theme.panel.background,
    boxShadow: {
      blur: 4,
      color: theme.panel.background,
      spread: 4,
      x: 0,
      y: 0
    },
    margin: '8px 0 0',
    padding: 16
  }),
  heading: theme => ({
    fontSize: 20,
    margin: {
      bottom: 8,
      top: 0
    }
  }),
  code: theme => ({
    border: {
      color: theme.verificationCode,
      radius: 4,
      style: 'dashed',
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