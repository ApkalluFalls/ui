import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LocalisationContext } from 'contexts/localisation';
import { ThemeContext } from "contexts/theme";
import { UserContext } from "contexts/user";
import PageLoader from 'components/content/PageLoader';
import UserBox from 'components/data/UserBox';
import routes from 'js/routes';
import pageRoutes from 'js/routes/pages';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/Container';

const useStyles = createUseStyles(style);

function Container() {
  const classes = useStyles(useContext(ThemeContext));
  const { locale } = useContext(LocalisationContext);
  const user = useContext(UserContext);

  return (
    <section className={classes.container}>
      <main className={classes.main}>
        {user.loading
          ? <PageLoader text={locale.info.talkingToFirebase} />
          : (
            <Switch>
              {routes.map(route => {
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
              <Route
                render={() => {
                  document.title = pageRoutes.notFound;
                  return <pageRoutes.notFound.component />;
                }}
              />
            </Switch>
          )
        }
      </main>
      <UserBox />
    </section>
  );
}

export default Container;