import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from "contexts/theme";
import routes from 'js/routes';
import pageRoutes from 'js/routes/pages';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/Container';
import globalStyle from 'styles/global';

function Container() {
  const theme = useContext(ThemeContext);
  createUseStyles(globalStyle(theme))();
  const classes = createUseStyles(style(theme))();
  const { locale } = useContext(LocalisationContext);

  return (
    <section className={classes.container}>
      <main className={classes.main}>
        <Switch>
          {routes.map(route => {
            if (route.notFoundRoute) {
              return (
                <span>NOT FOUND</span>
                // <Route
                //   key={route.path}
                //   render={() => {
                //     document.title = pageRoutes.notFound;
                //     return <pageRoutes.notFound.component />;
                //   }}
                // />
              );
            }

            const pageRoute = pageRoutes[route.path];
            const localeObj = locale.pages[route.source];

            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  if (localeObj && localeObj.title) {
                    document.title = `${localeObj.title} - Apkallu Falls`;
                  } else {
                    document.title = 'Apkallu Falls';
                  }

                  return (
                    <pageRoute.component
                      {...props}
                      {...pageRoute.props}
                      source={route.source}
                    />
                  );
                }}
              />
            );
          })}
        </Switch>
      </main>
    </section>
  );
}

export default Container;