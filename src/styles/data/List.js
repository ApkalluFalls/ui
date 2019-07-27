export default theme => {
  const { list: listTheme } = theme;

  return {
    list: {

    },
    patchList: {

    },
    patchListItem: {
      overflow: 'hidden',
      padding: 0
    },
    patchListPlaceholder: {
      height: 256
    },
    patchListItemHeading: {
      alignItems: 'center',
      background: listTheme.heading,
      border: 0,
      borderBottom: {
        color: theme.border,
        style: 'solid',
        width: 1
      },
      boxSizing: 'border-box',
      boxShadow: {
        color: listTheme.headingShadow,
        inset: 'inset',
        spread: 1,
        x: 0,
        y: 0
      },
      display: 'flex',
      height: 32,
      margin: 0,
      padding: '0 8px',
      width: '100%'
    },
    item: {
      alignItems: 'center',
      borderBottom: {
        color: theme.border,
        style: 'solid',
        width: 1
      },
      display: 'flex',
      marginBottom: 0,
      padding: 8,

      '&:last-child': {
        borderBottom: 0,
        marginBottom: 0
      }
    },
    icon: {
      alignSelf: 'flex-start',
      background: listTheme.methodBorder,
      borderRadius: '4px',
      boxShadow: {
        blur: 2,
        color: theme.shadow,
        x: 1,
        y: 1
      },
      flex: {
        basis: 40,
        grow: 0,
        shrink: 0
      },
      height: 40,
      marginRight: 10,
      overflow: 'hidden',
      position: 'relative',
      zIndex: 2
    },
    iconRound: {
      borderRadius: '100%'
    },
    detail: {
      flex: {
        grow: 1
      }
    },
    name: {
      fontSize: 16,
      margin: 0,
      textShadow: {
        blur: 1,
        color: theme.textShadow,
        x: 1,
        y: 1
      },
      textTransform: 'capitalize'
    },
    orchestrionNumber: {
      fontWeight: 'normal'
    },
    methods: {
      background: listTheme.methods,
      borderTop: {
        color: theme.border,
        style: 'solid',
        width: 1
      },
      boxShadow: {
        color: listTheme.methodShadow,
        inset: 'inset',
        spread: 1,
        x: 0,
        y: 0
      },
      listStyle: 'none',
      margin: {
        bottom: -8,
        left: -58,
        right: -8,
        top: 4
      },
      padding: {
        bottom: 8,
        left: 58,
        right: 8,
        top: 8
      },
      zIndex: 1
    },
    methodUnknown: {
      background: listTheme.methodUnknown
    },
    method: {
      alignItems: 'center',
      borderBottom: {
        color: listTheme.methodBorder,
        style: 'dotted',
        width: 1
      },
      display: 'flex',
      fontSize: 14,
      lineHeight: '14px',
      marginBottom: 4,
      paddingBottom: 4,
      verticalAlign: 'top',

      '&:last-child': {
        borderBottom: 0,
        marginBottom: 0,
        paddingBottom: 0
      }
    },
    methodLoading: {
      background: theme.methodShadow,
      display: 'block',
      height: 18,
      marginBottom: 5,

      '&:last-child': {
        marginBottom: 4
      }
    },
    methodIcon: {
      display: 'inline-block',
      height: 24,
      marginLeft: -6,
      marginTop: -2,
      verticalAlign: 'top'
    },
    methodText: {
      flexGrow: 1
    }
  };
}