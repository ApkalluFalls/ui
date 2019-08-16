export default () => {
  const controlDefaults = {
    borderStyle: 'solid',
    borderWidth: 1,
    boxSizing: 'border-box',
    display: 'block',
    fontSize: 16,
    lineHeight: '22px',
    maxWidth: 360,
    padding: '8px 12px',
    width: '100%',
  };

  return {
    control: {
      display: 'block',
      margin: {
        bottom: 16,
        top: 0
      },

      '&:last-child': {
        marginBottom: 0
      }
    },
    controlCollapsed: {
      margin: {
        bottom: 8,
        top: -8
      },
    },
    label: theme => ({
      color: theme.color,
      display: 'block',
      fontSize: 16,
      lineHeight: '19px',
      margin: {
        bottom: 4,
        top: 0
      }
    }),
    input: theme => ({
      ...controlDefaults,
      background: theme.form.inputBackground,
      borderColor: theme.form.inputBorder,
      color: theme.form.inputColor,

      '&::placeholder': {
        color: theme.form.placeholder
      },

      '&:disabled': {
        cursor: 'default',
        opacity: 0.6
      }
    }),
    button: theme => ({
      ...controlDefaults,
      background: theme.form.buttonBackground,
      borderColor: theme.form.buttonBorder,
      boxShadow: {
        blur: 2,
        color: theme.shadow,
        x: 1,
        y: 1
      },
      color: theme.form.buttonColor,
      cursor: 'pointer',
      transition: 'background .1s',

      '&:hover, &:focus': {
        background: theme.form.buttonBorder
      },

      '&:disabled': {
        background: theme.form.buttonBackground,
        boxShadow: 'initial',
        cursor: 'default',
        opacity: 0.6
      }
    }),
    linkButton: theme => ({
      ...controlDefaults,
      background: 'transparent',
      borderColor: 'transparent',
      color: theme.link,
      cursor: 'pointer',
      padding: '4px 0',

      '&:hover, &:focus': {
        color: theme.linkHoverFocus,
      },

      '&:disabled': {
        color: theme.link,
        cursor: 'default',
        opacity: 0.6
      }
    }),
    inputValidationError: theme => ({
      borderColor: theme.form.validationError
    }),
    validationError: theme => ({
      color: theme.form.validationError,
      fontSize: 14,
      lineHeight: '17px',
      margin: {
        bottom: 0,
        top: 4
      }
    })
  };
}