import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LocalisationContext, localisation } from 'contexts/localisation';
import routes from 'js/routes';
import pageRoutes from 'js/routes/pages';

// Theme.
import injectSheet from 'react-jss';
import style from 'styles/Container';

function Container({
  classes
}) {
  const locale = useContext(LocalisationContext);
  const text = localisation[locale];

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
            const localeObj = text.pages[route.source];

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

export default injectSheet(style)(Container);