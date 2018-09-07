# Apakllu Falls User Interface

This repository contains the building blocks used to create [https://apkallufalls.com](https://apkallufalls.com).

## 🚧 This repository is a work-in-progress
The current minified Apkallu Falls UI is not built from this repository, but will be in future. This repository is a patheway towards getting Apkallu Falls ready for React 17.

---

## Installation
After cloning the repository, you'll need to install the dependencies from NPM:

```
npm install
```

To get the project to run, you'll want two terminal windows open. In the first, run:

```
webpack --watch --mode=development
```

...and in the second, run:

```
npm run start
```

The repository will now be running at [http://127.0.0.1:7000](http://127.0.0.1:7000).

---

## UI Components

| Entrypoint | Alias |
| --- | --- |
| `src/js` | `js` |

UI components are written with [React](https://reactjs.org).

* `js/layout` contains the general page layout components.
* `js/pages` contains the individual page components.

To make life easier, rather than reinvent the wheel when it comes to implementing styling and theming, the `js/AFComponent.js` component can be used to wrap each styled component.

A new `ExamplePage` component located in `js/pages/ExamplePage` may look like this:

```javascript
import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/pages/ExamplePage";

const NewPage = ({ classes, locale }) => (
  <section className={classes.page}>
    <h2 className={classes.heading}>
      {locale.examplePage.heading}
    </h2>
    <p className={classes.example}>
      {locale.examplePage.intro}
    </p>
  </section>
);

export default () => (
  <AFComponent style={style}>
    <ExamplePage />
  </AFComponent>
);
```

## Styling
Styling is CSS module-based using [JSS](http://cssinjs.org/react-jss).

| Entrypoint | Alias |
| --- | --- |
| `src/styles` | `styles` |

The folder structure matches that of the `src/js` folder to make it easier to locate relevant component styles.

Using the `ExamplePage` component from the above UI Components section, the JSS for this compnent would exist at `styles/pages/ExampleComponent` and may look something like this:

```javascript
import page from "styles/page";

export default theme => ({
  ...page(theme),
  example: {
    color: 'tomato',
    textDecoration: 'underline'
  }
});
```

## Routing
Routing is handled by [React Router](https://reacttraining.com/react-router).

| Entrypoint | Alias |
| --- | --- |
| `src/js` | `js` |

* `js/routes.js` contains a collection of all routes.
* `js/pages/routes.js` maps routes to page components.

## Contexts

| Entrypoint | Alias |
| --- | --- |
| `src/contexts` | `contexts` |

Contexts are implemented using React's [Context API](https://reactjs.org/docs/context.html).

Contexts allow for passing properties down through a component hierarchy.

### Characters

| Entrypoint | Usage |
| --- | --- |
| `contexts/character` | Global |

### Localisation

| Entrypoint | Usage |
| --- | --- |
| `contexts/localisation` | Global |

In order to support multiple languages, content is localised using the localisation context.

This is easily implemented using the `js/AFComponent` component, where `locale` is exposed to the child component.

```javascript
import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/Example";

const Example = ({locale}) => (
  <p>{locale.example.foobar}</p>
);

export default () => (
  <AFComponent style={style}>
    <Example />
  </AFComponent>
)
```

#### Naming Convention
Key names must match the component name.

### Thememing

| Entrypoint | Usage |
| --- | --- |
| `contexts/theme` | Global |

To allow for light mode and dark mode, a theme context is used to pass relevant JSS variables down through the entire application.

This is easily implemented using the `js/AFComponent` component, where `classes` is exposed to the child component.

```javascript
import React from "react";
import AFComponent from "js/AFComponent";

import style from "styles/Example";

const Example = ({classes}) => (
  <section className={classes.example}>
    ...
  </section>
);

export default () => (
  <AFComponent style={style}>
    <Example />
  </AFComponent>
)
```
