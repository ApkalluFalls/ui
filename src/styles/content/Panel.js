export default (theme) => {
  const { panel: panelTheme } = theme;
  return {
    panel: {
      background: panelTheme.background,
      border: {
        color: theme.border,
        radius: 4,
        style: 'solid',
        width: 1
      },
      boxShadow: {
        x: 0,
        y: 1,
        blur: 2,
        color: theme.shadow
      },
      color: theme.color,
      marginBottom: 20,
      overflow: 'hidden',
      padding: 16
    },
    heading: {
      borderBottom: {
        color: panelTheme.headingBorder,
        style: 'solid',
        width: 1
      },
      fontSize: 16,
      marginBottom: 16,
      marginTop: -4,
      paddingBottom: 4
    }
  };
}