/**
 * The `<Container />` layout component wraps each page.
 * @module [ {js/layout} Container ]
 */
import React from "react";
import { Route } from 'react-router-dom';
import AFComponent from "js/AFComponent";

// Page routes.
import routes from "js/routes";
import pageRoutes from "js/pages/routes";

// Component style rules.
import style from "styles/layout/Container";

const Container = ({ classes }) => (
  <main className={classes.container}>
    {routes.map(route => {
      const pageRoute = pageRoutes[route.path];

      return (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          render={(props) => (
            <pageRoute.component
              {...props}
              {...pageRoute.props}
            />
          )}
        />
      );
    })}
  </main>
);

export default () => (
  <AFComponent style={style}>
    <Container />
  </AFComponent>
);