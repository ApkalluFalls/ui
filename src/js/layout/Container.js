/**
 * The `<Container />` layout component wraps each page.
 * @module [{js/layout}Container]
 */
import React from "react";
import { Route } from 'react-router-dom';
import AFComponent from "js/AFComponent";

// Language selector (used in the footer).
import Language from "js/components/Language";

// Page routes.
import routes from "js/routes";
import pageRoutes from "js/pages/routes";

// Component style rules.
import style from "styles/layout/Container";

const Container = ({ classes, locale, localeInject }) => (
  <section className={classes.container}>
    <main>
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
    <footer className={classes.footer}>
      <Language />
      <p className={classes.copyright}>
        <span>{locale.shared.copyright}</span>
        {' '}
        <span
          className={classes.footerLinks}
          dangerouslySetInnerHTML={{
            __html: localeInject(
              locale.shared.footerLinks,
              {
                href: 'https://twitter.com/apkallufalls',
                innerText: '@ApkalluFalls',
                rel: 'noopener noreferrer',
                target: '_blank'
              },
              {
                href: 'https://discord.gg/VZ9BhKy',
                innerText: 'Discord',
                rel: 'noopener noreferrer',
                target: '_blank'
              },
              {
                href: 'https://www.patreon.com/apkallufalls',
                innerText: 'Patreon',
                rel: 'noopener noreferrer',
                target: '_blank'
              },
              {
                href: 'https://donorbox.org/apkallufalls',
                innerText: locale.common.donate,
                rel: 'noopener noreferrer',
                target: '_blank'
              },
              {
                href: 'https://github.com/ApkalluFalls',
                innerText: 'GitHub',
                rel: 'noopener noreferrer',
                target: '_blank'
              }
            )
          }}
        />
      </p>
      <p className={classes.disclaimer}>FINAL FANTASY XIV ©2010 - 2018 SQUARE ENIX CO., LTD. FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. All material used under license.</p>
    </footer>
  </section>
);

export default () => (
  <AFComponent style={style}>
    <Container />
  </AFComponent>
);