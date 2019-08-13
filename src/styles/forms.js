export default theme => {
  const { form: formTheme } = theme;

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
      }
    },
    controlCollapsed: {
      margin: {
        bottom: 8,
        top: -8
      },
    },
    label: {
      color: theme.color,
      display: 'block',
      fontSize: 16,
      lineHeight: '19px',
      margin: {
        bottom: 4,
        top: 0
      }
    },
    input: {
      ...controlDefaults,
      background: formTheme.inputBackground,
      borderColor: formTheme.inputBorder,

      '&::placeholder': {
        color: formTheme.placeholder
      }
    },
    button: {
      ...controlDefaults,
      background: formTheme.buttonBackground,
      borderColor: formTheme.buttonBorder,
      boxShadow: {
        blur: 2,
        color: theme.shadow,
        x: 1,
        y: 1
      },
      color: formTheme.buttonColor,
      cursor: 'pointer',
      transition: 'background .1s',

      '&:hover, &:focus': {
        background: formTheme.buttonBorder
      },

      '&:disabled': {
        background: formTheme.buttonBackground,
        boxShadow: 'initial',
        cursor: 'default',
        opacity: 0.6
      }
    },
    linkButton: {
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
    },
    inputValidationError: {
      borderColor: formTheme.validationError
    },
    validationError: {
      color: formTheme.validationError,
      fontSize: 14,
      lineHeight: '17px',
      margin: {
        bottom: 0,
        top: 4
      }
    }
  };
}