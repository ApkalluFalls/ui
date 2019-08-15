export default (theme) => {
  const { form: formTheme } = theme;

  return {
    help: {
      color: theme.colorSubtle,
      fontSize: 14,
      marginTop: 12,

      '&:last-child': {
        marginBottom: 0
      }
    },
    loadingNote: {
      fontSize: 12
    }
  };
}